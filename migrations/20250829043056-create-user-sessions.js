'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_sessions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'customers',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            access_token: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            refresh_token: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            device_info: {
                type: Sequelize.STRING
            },
            ip_address: {
                type: Sequelize.STRING
            },
            user_agent: {
                type: Sequelize.STRING
            },
            last_used_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_sessions');
    }
};