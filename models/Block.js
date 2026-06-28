'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Block extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Tower, {
                foreignKey: 'block_id',
                as: 'towers'
            });
            this.hasMany(models.Flat, {
                foreignKey: 'block_id',
                as: 'flats'
            });
        }
    }

    Block.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
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
        modelName: 'Block',
        tableName: 'blocks',
        underscored: true,
        paranoid: true
    });

    return Block;
};
