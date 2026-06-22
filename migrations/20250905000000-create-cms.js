'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('cms', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            title_ar: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            content_ar: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
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
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cms');
    }
};