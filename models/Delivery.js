'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Delivery extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    Delivery.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        delivery_partner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tracking_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        delivery_type: {
            type: DataTypes.ENUM('amazon', 'flipkart', 'courier', 'food', 'grocery', 'other'),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('pending', 'received', 'delivered'),
            allowNull: false,
            defaultValue: 'pending'
        },
        receivedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'received_at'
        },
        deliveredAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'delivered_at'
        }
    }, {
        sequelize,
        modelName: 'Delivery',
        tableName: 'deliveries',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return Delivery;
};
