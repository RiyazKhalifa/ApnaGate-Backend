'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PollVote extends Model {
        static associate(models) {
            this.belongsTo(models.PollOption, {
                foreignKey: 'poll_option_id',
                as: 'option',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    PollVote.init({
        poll_option_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'PollVote',
        tableName: 'poll_votes',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false,
        indexes: [{ unique: true, fields: ['resident_id', 'poll_option_id'] }]
    });

    return PollVote;
};
