"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            this.belongsTo(models.Customer, {
                foreignKey: "customerId",
                as: "customer"
            });
        }
    }
    Notification.init(
        {
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "customer_id"
            },
            type: {
                type: DataTypes.ENUM("admin", "customer"),
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
            is_read: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: "Notification",
            tableName: "notifications",
            underscored: true,
            timestamps: true,
            paranoid: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at"
        }
    );
    return Notification;
};
