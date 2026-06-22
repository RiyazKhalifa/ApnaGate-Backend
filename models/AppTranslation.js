"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AppTranslation extends Model {
        static associate(models) {
            // No associations specified
        }
    }

    AppTranslation.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            lang_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lang_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            direction: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "ltr",
            },
            customer_translation_data: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "AppTranslation",
            tableName: "app_translations",
            underscored: true,
            timestamps: true,
        },
    );

    return AppTranslation;
};
