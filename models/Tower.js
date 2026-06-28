'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tower extends Model {
        static associate(models) {
            this.belongsTo(models.Block, {
                foreignKey: 'block_id',
                as: 'block',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Floor, {
                foreignKey: 'tower_id',
                as: 'floors'
            });
            this.hasMany(models.Flat, {
                foreignKey: 'tower_id',
                as: 'flats'
            });
        }
    }

    Tower.init({
        block_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        floors_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Tower',
        tableName: 'towers',
        underscored: true,
        paranoid: true
    });

    return Tower;
};
