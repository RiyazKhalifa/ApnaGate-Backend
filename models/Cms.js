'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cms extends Model {
        static associate(models) {
            // Define associations if needed
        }
    }

    Cms.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content_ar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Cms',
        tableName: 'cms',
        underscored: true,
        paranoid: true
    });

    return Cms;
};