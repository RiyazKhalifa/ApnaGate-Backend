'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            this.belongsTo(models.Payment, {
                foreignKey: 'payment_id',
                as: 'payment',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    Transaction.init({
        payment_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        transaction_type: {
            type: DataTypes.ENUM('payment', 'refund'),
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        gateway_response: {
            type: DataTypes.JSON,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('success', 'failed', 'pending'),
            allowNull: false,
            defaultValue: 'pending'
        }
    }, {
        sequelize,
        modelName: 'Transaction',
        tableName: 'transactions',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false
    });

    return Transaction;
};
