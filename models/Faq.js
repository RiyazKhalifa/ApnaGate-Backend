'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Faq extends Model {
        static associate(models) {
            // Define associations if needed
        }
    }

    Faq.init({
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        question_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer_ar: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        },
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Faq',
        tableName: 'faqs',
        underscored: true,
        paranoid: true
    });

    return Faq;
};