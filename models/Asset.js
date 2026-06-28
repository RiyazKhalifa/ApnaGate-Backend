'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Asset extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.AssetMaintenanceLog, {
                foreignKey: 'asset_id',
                as: 'maintenanceLogs'
            });
        }
    }

    Asset.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        assetCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'asset_code'
        },
        purchaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'purchase_date'
        },
        purchasePrice: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: true,
            field: 'purchase_price'
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'under_maintenance', 'disposed'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Asset',
        tableName: 'assets',
        underscored: true,
        paranoid: true
    });

    return Asset;
};
