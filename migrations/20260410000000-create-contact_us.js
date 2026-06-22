'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('contact_us', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    isNumeric: true
                }
            },
            subject: {
                type: Sequelize.STRING,
                allowNull: true
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            reply: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            replied_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            status: {
                type: Sequelize.ENUM("pending", "read", "replied"),
                defaultValue: "pending"
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
        await queryInterface.dropTable('contact_us');
    }
};
