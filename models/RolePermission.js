'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        static associate(models) {
            // Each RolePermission belongs to ONE Role
            this.belongsTo(models.Role, {
                foreignKey: 'roleId',
                as: 'role',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            // Each RolePermission belongs to ONE Permission
            this.belongsTo(models.Permission, {
                foreignKey: 'permissionId',
                as: 'permission',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    }

    RolePermission.init({
        roleId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "roles",
                key: "id",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        permissionId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "permissions",
                key: "id",
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    }, {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'role_permissions',
        timestamps: true,
        underscored: true,
        indexes: [{ unique: true, fields: ['role_id', 'permission_id'] }]
    });

    return RolePermission;
};