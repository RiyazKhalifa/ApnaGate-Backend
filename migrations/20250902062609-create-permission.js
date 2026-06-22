'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('permissions', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            name_ar: {
                type: Sequelize.STRING,
                allowNull: false
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
                allowNull: true,
                type: Sequelize.DATE
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('permissions');
    }
};