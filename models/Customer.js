'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            // A Customer can have MANY sessions
            this.hasMany(models.UserSession, {
                foreignKey: "customerId",
                as: "userSessions"
            });
        }
    }

    Customer.init({
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const profileImage = this.getDataValue("profile_image");
                if (!profileImage) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${profileImage}`.replace(/\\/g, "/");
            },
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active',
        },
        reset_password_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        reset_password_expires: {
            type: DataTypes.DATE,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers',
        underscored: true,
        paranoid: true
    });

    return Customer;
};