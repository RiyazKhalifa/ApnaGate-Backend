'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('deliveries', {
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
            delivery_partner: {
                type: Sequelize.STRING,
                allowNull: true
            },
            tracking_number: {
                type: Sequelize.STRING,
                allowNull: true
            },
            delivery_type: {
                type: Sequelize.ENUM('amazon', 'flipkart', 'courier', 'food', 'grocery', 'other'),
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('pending', 'received', 'delivered'),
                allowNull: false,
                defaultValue: 'pending'
            },
            received_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            delivered_at: {
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
        await queryInterface.dropTable('deliveries');
    }
};
