"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("app_settings", {
            Id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            Name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Setting: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            Compulsory: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
                ),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("app_settings");
    },
};
