'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Each User belongs to ONE Role (via roleId FK in users table)
            this.belongsTo(models.Role, {
                foreignKey: 'roleId',
                as: 'role',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            // One User can have MANY sessions (user_sessions table)
            this.hasMany(models.UserSession, {
                foreignKey: 'userId',
                as: 'userSessions'
            });
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const profileImage = this.getDataValue("profile_image");
                if (!profileImage) return null;

                const baseUrl = process.env.BASE_URL;
                return `${baseUrl}${profileImage}`.replace(/\\/g, "/");
            },
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
        reset_password_token: {
            type: DataTypes.STRING
        },
        reset_password_expires: {
            type: DataTypes.DATE
        },
        roleId: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        underscored: true
    });

    return User;
};