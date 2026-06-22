'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('customers', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            profile_image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active',
            },
            reset_password_token: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            reset_password_expires: {
                type: Sequelize.DATE,
                allowNull: true,
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
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('customers');
    }
};