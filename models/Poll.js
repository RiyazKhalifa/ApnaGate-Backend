'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Poll extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.SocietyUser, {
                foreignKey: 'created_by',
                as: 'creator',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            this.hasMany(models.PollOption, {
                foreignKey: 'poll_id',
                as: 'options'
            });
        }
    }

    Poll.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'expires_at'
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Poll',
        tableName: 'polls',
        underscored: true,
        paranoid: true
    });

    return Poll;
};
