'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PollOption extends Model {
        static associate(models) {
            this.belongsTo(models.Poll, {
                foreignKey: 'poll_id',
                as: 'poll',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.PollVote, {
                foreignKey: 'poll_option_id',
                as: 'votes'
            });
        }
    }

    PollOption.init({
        poll_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        option_text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'PollOption',
        tableName: 'poll_options',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false
    });

    return PollOption;
};
