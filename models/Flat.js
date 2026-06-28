'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Flat extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Block, {
                foreignKey: 'block_id',
                as: 'block',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Tower, {
                foreignKey: 'tower_id',
                as: 'tower',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Floor, {
                foreignKey: 'floor_id',
                as: 'floor',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Resident, {
                foreignKey: 'flat_id',
                as: 'residents'
            });
        }
    }

    Flat.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        block_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        tower_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        floor_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        flat_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('1BHK', '2BHK', '3BHK', '4BHK', 'VILLA'),
            allowNull: false
        },
        area: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        parking_slots: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('occupied', 'vacant', 'maintenance'),
            allowNull: false,
            defaultValue: 'vacant'
        }
    }, {
        sequelize,
        modelName: 'Flat',
        tableName: 'flats',
        underscored: true,
        paranoid: true
    });

    return Flat;
};
