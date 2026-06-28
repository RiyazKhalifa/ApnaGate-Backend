'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ResidentFamilyMember extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    ResidentFamilyMember.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        relation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true
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
        }
    }, {
        sequelize,
        modelName: 'ResidentFamilyMember',
        tableName: 'resident_family_members',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return ResidentFamilyMember;
};
