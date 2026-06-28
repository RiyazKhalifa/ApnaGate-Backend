'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            // Polymorphic associations can be defined here if needed, 
            // but standard Sequelize polymorphic belongsTo is handled dynamically or via hooks.
        }
    }

    Notification.init({
        recipient_type: {
            type: DataTypes.ENUM('user', 'society_user', 'resident'),
            allowNull: false
        },
        recipient_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Notification',
        tableName: 'notifications',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return Notification;
};
