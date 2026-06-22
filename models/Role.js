'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            // One Role can be assigned to MANY Users
            this.hasMany(models.User, {
                foreignKey: 'roleId',
                as: 'users'
            });

            // Many-to-Many: Role ↔ Permissions (via role_permissions)
            this.belongsToMany(models.Permission, {
                through: models.RolePermission,
                foreignKey: 'roleId',
                as: 'permissions'
            });
        }
    }

    Role.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        underscored: true,
        paranoid: true
    });

    return Role;
};