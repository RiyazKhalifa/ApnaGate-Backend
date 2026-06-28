'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SocietyRole extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.SocietyRolePermission, {
                foreignKey: 'society_role_id',
                as: 'permissions'
            });
            this.hasMany(models.SocietyUser, {
                foreignKey: 'society_role_id',
                as: 'users'
            });
        }
    }

    SocietyRole.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'SocietyRole',
        tableName: 'society_roles',
        underscored: true,
        paranoid: true
    });

    return SocietyRole;
};
