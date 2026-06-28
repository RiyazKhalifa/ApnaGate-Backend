'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('audit_logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            performed_by_type: {
                type: Sequelize.ENUM('user', 'society_user'),
                allowNull: false
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            module: {
                type: Sequelize.STRING,
                allowNull: false
            },
            record_id: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            action: {
                type: Sequelize.STRING,
                allowNull: false
            },
            old_data: {
                type: Sequelize.JSON,
                allowNull: true
            },
            new_data: {
                type: Sequelize.JSON,
                allowNull: true
            },
            ip_address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            user_agent: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        // Add index on performed_by_type and user_id for fast polymorphic user lookups
        await queryInterface.addIndex('audit_logs', ['performed_by_type', 'user_id']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('audit_logs');
    }
};
