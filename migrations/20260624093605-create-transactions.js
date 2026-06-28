'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            payment_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'payments',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            transaction_type: {
                type: Sequelize.ENUM('payment', 'refund'),
                allowNull: false
            },
            amount: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false
            },
            gateway_response: {
                type: Sequelize.JSON,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM('success', 'failed', 'pending'),
                allowNull: false,
                defaultValue: 'pending'
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('transactions');
    }
};
