'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Resident extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Flat, {
                foreignKey: 'flat_id',
                as: 'flat',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.ResidentFamilyMember, {
                foreignKey: 'resident_id',
                as: 'familyMembers'
            });
            this.hasMany(models.Visitor, {
                foreignKey: 'resident_id',
                as: 'visitors'
            });
            this.hasMany(models.DailyHelper, {
                foreignKey: 'resident_id',
                as: 'helpers'
            });
            this.hasMany(models.Vehicle, {
                foreignKey: 'resident_id',
                as: 'vehicles'
            });
            this.hasMany(models.Delivery, {
                foreignKey: 'resident_id',
                as: 'deliveries'
            });
        }
    }

    Resident.init({
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        flat_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        resident_type: {
            type: DataTypes.ENUM('owner', 'tenant'),
            allowNull: false
        },
        moveInDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'move_in_date'
        },
        moveOutDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'move_out_date'
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emergency_contact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Resident',
        tableName: 'residents',
        underscored: true,
        paranoid: true
    });

    return Resident;
};
