'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vendor extends Model {
        static associate(models) {
            this.hasMany(models.Staff, {
                foreignKey: 'vendor_id',
                as: 'staff'
            });
        }
    }

    Vendor.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        service_type: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'service_type'
        },
        gst_number: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'gst_number'
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Vendor',
        tableName: 'vendors',
        underscored: true,
        paranoid: true
    });

    return Vendor;
};
