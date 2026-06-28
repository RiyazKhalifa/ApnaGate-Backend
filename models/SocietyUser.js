'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SocietyUser extends Model {
        static associate(models) {
            this.belongsTo(models.Society, {
                foreignKey: 'society_id',
                as: 'society',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.belongsTo(models.SocietyRole, {
                foreignKey: 'society_role_id',
                as: 'role',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            });
            this.hasMany(models.VisitorLog, {
                foreignKey: 'security_guard_id',
                as: 'guardLogs'
            });
        }
    }

    SocietyUser.init({
        society_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        society_role_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const profileImage = this.getDataValue("profile_image");
                if (!profileImage) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${profileImage}`.replace(/\\/g, "/");
            }
        },
        lastLoginAt: {
            type: DataTypes.DATE,
            field: 'last_login_at'
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        sequelize,
        modelName: 'SocietyUser',
        tableName: 'society_users',
        underscored: true,
        paranoid: true
    });

    return SocietyUser;
};
