'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('flats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            society_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'societies',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            block_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'blocks',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            tower_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'towers',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            floor_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'floors',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            flat_number: {
                type: Sequelize.STRING,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM('1BHK', '2BHK', '3BHK', '4BHK', 'VILLA'),
                allowNull: false
            },
            area: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true
            },
            parking_slots: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            status: {
                type: Sequelize.ENUM('occupied', 'vacant', 'maintenance'),
                allowNull: false,
                defaultValue: 'vacant'
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
        await queryInterface.dropTable('flats');
    }
};
