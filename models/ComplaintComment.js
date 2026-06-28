'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ComplaintComment extends Model {
        static associate(models) {
            this.belongsTo(models.Complaint, {
                foreignKey: 'complaint_id',
                as: 'complaint',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    ComplaintComment.init({
        complaint_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        user_type: {
            type: DataTypes.ENUM('user', 'society_user', 'resident'),
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ComplaintComment',
        tableName: 'complaint_comments',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return ComplaintComment;
};
