"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AppSetting extends Model {
        static associate(models) {
            // No associations
        }
    }

    AppSetting.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            setting: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            compulsory: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "AppSetting",
            tableName: "app_settings",
            underscored: true,
            timestamps: true,
        },
    );

    return AppSetting;
};
