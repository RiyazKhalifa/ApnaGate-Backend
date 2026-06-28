'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vehicle extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    Vehicle.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        vehicle_type: {
            type: DataTypes.ENUM('car', 'bike', 'scooter', 'truck', 'other'),
            allowNull: false
        },
        vehicle_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rfid_tag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Vehicle',
        tableName: 'vehicles',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return Vehicle;
};
