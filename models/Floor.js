'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Floor extends Model {
        static associate(models) {
            this.belongsTo(models.Tower, {
                foreignKey: 'tower_id',
                as: 'tower',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.Flat, {
                foreignKey: 'floor_id',
                as: 'flats'
            });
        }
    }

    Floor.init({
        tower_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        floor_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Floor',
        tableName: 'floors',
        underscored: true,
        paranoid: true
    });

    return Floor;
};
