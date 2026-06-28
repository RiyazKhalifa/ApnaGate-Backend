'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MaintenanceInvoice extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Payment, {
                foreignKey: 'invoice_id',
                as: 'payments'
            });
        }
    }

    MaintenanceInvoice.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        invoice_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'due_date'
        },
        lateFee: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0.00,
            field: 'late_fee'
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'overdue'),
            allowNull: false,
            defaultValue: 'pending'
        }
    }, {
        sequelize,
        modelName: 'MaintenanceInvoice',
        tableName: 'maintenance_invoices',
        underscored: true,
        paranoid: true
    });

    return MaintenanceInvoice;
};
