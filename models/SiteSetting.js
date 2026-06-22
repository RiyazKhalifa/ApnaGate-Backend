'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SiteSetting extends Model {
        static associate(models) {
            // No associations
        }
    }

    SiteSetting.init({
        site_key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        site_value: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'SiteSetting',
        tableName: 'site_settings',
        underscored: true
    });

    return SiteSetting;
};