'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class HelperAttendance extends Model {
        static associate(models) {
            this.belongsTo(models.DailyHelper, {
                foreignKey: 'helper_id',
                as: 'helper',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
        }
    }

    HelperAttendance.init({
        helper_id: {
            type: DataTypes.BIGINT,
            allowNull: false
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
        }
    }, {
        sequelize,
        modelName: 'HelperAttendance',
        tableName: 'helper_attendance',
        underscored: true,
        timestamps: true,
        updatedAt: false,
        createdAt: 'created_at',
        deletedAt: false
    });

    return HelperAttendance;
};
