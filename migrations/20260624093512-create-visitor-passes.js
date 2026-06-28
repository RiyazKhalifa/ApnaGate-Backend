'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('visitor_passes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            visitor_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'visitors',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            qr_code: {
                type: Sequelize.STRING,
                allowNull: true
            },
            pass_code: {
                type: Sequelize.STRING,
                allowNull: false
            },
            valid_from: {
                type: Sequelize.DATE,
                allowNull: false
            },
            valid_until: {
                type: Sequelize.DATE,
                allowNull: false
            },
            is_used: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('visitor_passes');
    }
};
