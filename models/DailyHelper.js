'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DailyHelper extends Model {
        static associate(models) {
            this.belongsTo(models.Resident, {
                foreignKey: 'resident_id',
                as: 'resident',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.HelperAttendance, {
                foreignKey: 'helper_id',
                as: 'attendance'
            });
        }
    }

    DailyHelper.init({
        resident_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true
        },
        helper_type: {
            type: DataTypes.ENUM('maid', 'cook', 'driver', 'tutor', 'cleaner', 'electrician'),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const photo = this.getDataValue("photo");
                if (!photo) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${photo}`.replace(/\\/g, "/");
            }
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'DailyHelper',
        tableName: 'daily_helpers',
        underscored: true,
        timestamps: true,
        paranoid: false
    });

    return DailyHelper;
};
