'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Amenity extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.AmenityBooking, {
                foreignKey: 'amenity_id',
                as: 'bookings'
            });
        }
    }

    Amenity.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        bookingFee: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0.00,
            field: 'booking_fee'
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Amenity',
        tableName: 'amenities',
        underscored: true,
        paranoid: true
    });

    return Amenity;
};
