'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserSession extends Model {
        static associate(models) {
            // A session belongs to ONE User (if logged in as user)
            this.belongsTo(models.User, {
                foreignKey: "userId",
                as: "user",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });

            // A session belongs to ONE Customer (if logged in as customer)
            this.belongsTo(models.Customer, {
                foreignKey: "customerId",
                as: "customer",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    UserSession.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        accessToken: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'access_token'
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'refresh_token'
        },
        deviceInfo: {
            type: DataTypes.STRING,
            field: 'device_info'
        },
        ipAddress: {
            type: DataTypes.STRING,
            field: 'ip_address'
        },
        userAgent: {
            type: DataTypes.STRING,
            field: 'user_agent'
        },
        lastUsedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'last_used_at'
        }
    }, {
        sequelize,
        modelName: 'UserSession',
        tableName: 'user_sessions',
        paranoid: true,
        underscored: true,
    });

    return UserSession;
};