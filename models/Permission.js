'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Permission extends Model {
        static associate(models) {
            // Many-to-Many: Permission ↔ Roles (via role_permissions)
            this.belongsToMany(models.Role, {
                through: models.RolePermission,
                foreignKey: 'permissionId',
                as: 'roles'
            });
        }
    }

    Permission.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_ar: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
        underscored: true,
        paranoid: true
    });

    return Permission;
};