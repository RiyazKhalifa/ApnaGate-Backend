'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventAttendee extends Model {
        static associate(models) {
            this.belongsTo(models.Event, {
                foreignKey: 'event_id',
                as: 'event',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    EventAttendee.init({
        event_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('registered', 'attended', 'cancelled'),
            allowNull: false,
            defaultValue: 'registered'
        }
    }, {
        sequelize,
        modelName: 'EventAttendee',
        tableName: 'event_attendees',
        underscored: true,
        timestamps: true,
        paranoid: false,
        indexes: [{ unique: true, fields: ['event_id', 'resident_id'] }]
    });

    return EventAttendee;
};
