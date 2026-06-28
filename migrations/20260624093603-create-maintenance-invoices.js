'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('maintenance_invoices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
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
            invoice_number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            amount: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false
            },
            due_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            late_fee: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false,
                defaultValue: 0.00
            },
            status: {
                type: Sequelize.ENUM('pending', 'paid', 'overdue'),
                allowNull: false,
                defaultValue: 'pending'
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
                allowNull: true
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('maintenance_invoices');
    }
};
