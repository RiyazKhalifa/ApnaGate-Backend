'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VisitorLog extends Model {
        static associate(models) {
            this.belongsTo(models.Visitor, {
                foreignKey: 'visitor_id',
                as: 'visitor',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.SocietyUser, {
                foreignKey: 'security_guard_id',
                as: 'guard',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    }

    VisitorLog.init({
        visitor_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        security_guard_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        checkIn: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'check_in',
            defaultValue: DataTypes.NOW
        },
        checkOut: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'check_out'
        },
        gate: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remarks: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'VisitorLog',
        tableName: 'visitor_logs',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false
    });

    return VisitorLog;
};
