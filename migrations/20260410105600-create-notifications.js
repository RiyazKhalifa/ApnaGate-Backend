"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("notifications", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "customers",
                    key: "id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            },
            type: {
                type: Sequelize.ENUM("admin", "customer"),
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            is_read: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        });

        // Add index for customer_id and is_read for performance
        await queryInterface.addIndex("notifications", ["customer_id", "is_read"]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("notifications");
        // ENUM types might need explicit dropping in some dialects like Postgres, 
        // but for MySQL/SQLite it's usually fine. 
        // Sequelize often handles this or it's not needed.
    }
};
