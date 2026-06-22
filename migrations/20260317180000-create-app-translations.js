"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("app_translations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            lang_code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lang_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            direction: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "ltr",
            },
            customer_translation_data: {
                type: Sequelize.TEXT("long"),
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
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("app_translations");
    },
};
