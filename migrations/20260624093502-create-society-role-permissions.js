'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('society_role_permissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            society_role_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'society_roles',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            permission_key: {
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
            }
        });

        // Add a unique index to prevent duplicate permissions per role
        await queryInterface.addIndex('society_role_permissions', {
            fields: ['society_role_id', 'permission_key'],
            unique: true,
            name: 'society_role_permissions_unique'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('society_role_permissions');
    }
};
