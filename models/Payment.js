'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            this.belongsTo(models.MaintenanceInvoice, {
                foreignKey: 'invoice_id',
                as: 'invoice',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Transaction, {
                foreignKey: 'payment_id',
                as: 'transactions'
            });
        }
    }

    Payment.init({
        invoice_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        payment_method: {
            type: DataTypes.ENUM('cash', 'card', 'upi', 'net_banking', 'wallet'),
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        gateway_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gateway_transaction_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transaction_reference: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending'
        },
        paidAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'paid_at'
        }
    }, {
        sequelize,
        modelName: 'Payment',
        tableName: 'payments',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return Payment;
};
