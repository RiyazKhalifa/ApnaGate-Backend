'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Society extends Model {
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'created_by',
                as: 'creator',
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            });
            this.hasMany(models.SocietyRole, {
                foreignKey: 'society_id',
                as: 'roles'
            });
            this.hasMany(models.SocietyUser, {
                foreignKey: 'society_id',
                as: 'users'
            });
            this.hasMany(models.Block, {
                foreignKey: 'society_id',
                as: 'blocks'
            });
            this.hasMany(models.Flat, {
                foreignKey: 'society_id',
                as: 'flats'
            });
            this.hasMany(models.Resident, {
                foreignKey: 'society_id',
                as: 'residents'
            });
        }
    }

    Society.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name_ar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registration_no: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const logo = this.getDataValue("logo");
                if (!logo) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${logo}`.replace(/\\/g, "/");
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'active', 'inactive', 'suspended'),
            allowNull: false,
            defaultValue: 'pending'
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Society',
        tableName: 'societies',
        underscored: true,
        paranoid: true
    });

    return Society;
};
