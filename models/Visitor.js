'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Visitor extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.VisitorLog, {
                foreignKey: 'visitor_id',
                as: 'logs'
            });
            this.hasMany(models.VisitorPass, {
                foreignKey: 'visitor_id',
                as: 'passes'
            });
        }
    }

    Visitor.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true
        },
        purpose: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        visitor_type: {
            type: DataTypes.ENUM('guest', 'delivery', 'cab', 'family', 'friend', 'vendor'),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const photo = this.getDataValue("photo");
                if (!photo) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${photo}`.replace(/\\/g, "/");
            }
        },
        vehicle_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        expectedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'expected_at'
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'checked_in', 'checked_out'),
            allowNull: false,
            defaultValue: 'pending'
        }
    }, {
        sequelize,
        modelName: 'Visitor',
        tableName: 'visitors',
        underscored: true,
        paranoid: true
    });

    return Visitor;
};
