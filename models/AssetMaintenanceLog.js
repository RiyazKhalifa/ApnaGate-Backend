'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AssetMaintenanceLog extends Model {
        static associate(models) {
            this.belongsTo(models.Asset, {
                foreignKey: 'asset_id',
                as: 'asset',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Vendor, {
                foreignKey: 'vendor_id',
                as: 'vendor',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    AssetMaintenanceLog.init({
        asset_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        vendor_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        maintenanceDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'maintenance_date'
        },
        cost: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'AssetMaintenanceLog',
        tableName: 'asset_maintenance_logs',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return AssetMaintenanceLog;
};
