'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('amenity_bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            amenity_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'amenities',
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
            booking_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            start_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            end_time: {
                type: Sequelize.DATE,
                allowNull: false
            },
            payment_status: {
                type: Sequelize.ENUM('pending', 'paid', 'failed'),
                allowNull: false,
                defaultValue: 'pending'
            },
            status: {
                type: Sequelize.ENUM('pending', 'approved', 'rejected', 'cancelled', 'completed'),
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
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('amenity_bookings');
    }
};
