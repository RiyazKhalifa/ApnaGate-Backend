'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Event extends Model {
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
            this.hasMany(models.EventAttendee, {
                foreignKey: 'event_id',
                as: 'attendees'
            });
        }
    }

    Event.init({
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
            allowNull: true
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'event_date'
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Event',
        tableName: 'events',
        underscored: true,
        paranoid: true
    });

    return Event;
};
