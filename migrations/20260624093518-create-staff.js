'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('staff', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            vendor_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: 'vendors',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            designation: {
                type: Sequelize.STRING,
                allowNull: false
            },
            shift_start: {
                type: Sequelize.TIME,
                allowNull: true
            },
            shift_end: {
                type: Sequelize.TIME,
                allowNull: true
            },
            salary: {
                type: Sequelize.DECIMAL(12, 2),
                allowNull: true
            },
            joining_date: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
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
        await queryInterface.dropTable('staff');
    }
};
