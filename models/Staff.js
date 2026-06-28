'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Staff extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            this.belongsTo(models.Vendor, {
                foreignKey: 'vendor_id',
                as: 'vendor',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
        }
    }

    Staff.init({
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        vendor_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        shiftStart: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'shift_start'
        },
        shiftEnd: {
            type: DataTypes.TIME,
            allowNull: true,
            field: 'shift_end'
        },
        salary: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: true
        },
        joiningDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'joining_date'
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'Staff',
        tableName: 'staff',
        underscored: true,
        paranoid: true
    });

    return Staff;
};
