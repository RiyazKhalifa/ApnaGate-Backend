'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('asset_maintenance_logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            asset_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'assets',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            vendor_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'vendors',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            maintenance_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            cost: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: false,
                defaultValue: 0.00
            },
            remarks: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('asset_maintenance_logs');
    }
};
