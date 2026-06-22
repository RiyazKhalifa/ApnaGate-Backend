"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ContactUs extends Model {
        static associate(models) {
            // No associations needed for now
        }
    }
    ContactUs.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            subject: {
                type: DataTypes.STRING,
                allowNull: true
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM("pending", "read", "replied"),
                defaultValue: "pending"
            },
            reply: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            replied_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "ContactUs",
            tableName: "contact_us",
            underscored: true,
            timestamps: true,
            paranoid: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: "deleted_at"
        }
    );
    return  ContactUs;
};
