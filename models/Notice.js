'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Notice extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.SocietyUser, {
                foreignKey: 'created_by',
                as: 'creator',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    }

    Notice.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'start_date'
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'end_date'
        },
        visibility: {
            type: DataTypes.ENUM('all', 'owners', 'tenants', 'committee'),
            allowNull: false,
            defaultValue: 'all'
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Notice',
        tableName: 'notices',
        underscored: true,
        paranoid: true
    });

    return Notice;
};
