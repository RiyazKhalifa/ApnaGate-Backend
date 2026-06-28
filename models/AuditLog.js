'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AuditLog extends Model {
        static associate(models) {
            // Polymorphic associations are typically resolved dynamically or via helper methods.
        }
    }

    AuditLog.init({
        performed_by_type: {
            type: DataTypes.ENUM('user', 'society_user'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        module: {
            type: DataTypes.STRING,
            allowNull: false
        },
        record_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false
        },
        old_data: {
            type: DataTypes.JSON,
            allowNull: true
        },
        new_data: {
            type: DataTypes.JSON,
            allowNull: true
        },
        ip_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_agent: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'AuditLog',
        tableName: 'audit_logs',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false,
        indexes: [{ fields: ['performed_by_type', 'user_id'] }]
    });

    return AuditLog;
};
