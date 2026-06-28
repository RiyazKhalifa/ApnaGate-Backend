'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Complaint extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.Staff, {
                foreignKey: 'assigned_staff_id',
                as: 'assignedStaff',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            this.hasMany(models.ComplaintComment, {
                foreignKey: 'complaint_id',
                as: 'comments'
            });
            this.hasMany(models.ComplaintAttachment, {
                foreignKey: 'complaint_id',
                as: 'attachments'
            });
        }
    }

    Complaint.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        assigned_staff_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
            allowNull: false,
            defaultValue: 'medium'
        },
        status: {
            type: DataTypes.ENUM('open', 'assigned', 'in_progress', 'resolved', 'closed'),
            allowNull: false,
            defaultValue: 'open'
        }
    }, {
        sequelize,
        modelName: 'Complaint',
        tableName: 'complaints',
        underscored: true,
        paranoid: true
    });

    return Complaint;
};
