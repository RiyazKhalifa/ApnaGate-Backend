'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('faqs', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            question: {
                type: Sequelize.STRING,
                allowNull: false
            },
            question_ar: {
                type: Sequelize.STRING,
                allowNull: false
            },
            answer: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            answer_ar: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
            },
            sequence: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0
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
        await queryInterface.dropTable('faqs');
    }
};