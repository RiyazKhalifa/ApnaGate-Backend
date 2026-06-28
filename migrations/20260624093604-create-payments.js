'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('payments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            invoice_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'maintenance_invoices',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            resident_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'residents',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            payment_method: {
                type: Sequelize.ENUM('cash', 'card', 'upi', 'net_banking', 'wallet'),
                allowNull: false
            },
            amount: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false
            },
            gateway_name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            gateway_transaction_id: {
                type: Sequelize.STRING,
                allowNull: true
            },
            transaction_reference: {
                type: Sequelize.STRING,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM('pending', 'success', 'failed', 'refunded'),
                allowNull: false,
                defaultValue: 'pending'
            },
            paid_at: {
                type: Sequelize.DATE,
                allowNull: true
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
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('payments');
    }
};
