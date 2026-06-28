'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AmenityBooking extends Model {
        static associate(models) {
            this.belongsTo(models.Amenity, {
                foreignKey: 'amenity_id',
                as: 'amenity',
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

    AmenityBooking.init({
        amenity_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        bookingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'booking_date'
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'start_time'
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'end_time'
        },
        paymentStatus: {
            type: DataTypes.ENUM('pending', 'paid', 'failed'),
            allowNull: false,
            defaultValue: 'pending',
            field: 'payment_status'
        },
        status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed'),
            allowNull: false,
            defaultValue: 'pending'
        }
    }, {
        sequelize,
        modelName: 'AmenityBooking',
        tableName: 'amenity_bookings',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return AmenityBooking;
};
