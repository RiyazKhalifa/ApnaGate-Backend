'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SocietyRolePermission extends Model {
        static associate(models) {
            this.belongsTo(models.SocietyRole, {
                foreignKey: 'society_role_id',
                as: 'role',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    SocietyRolePermission.init({
        society_role_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        permission_key: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'SocietyRolePermission',
        tableName: 'society_role_permissions',
        underscored: true,
        timestamps: true,
        paranoid: false,
        indexes: [{ unique: true, fields: ['society_role_id', 'permission_key'] }]
    });

    return SocietyRolePermission;
};
