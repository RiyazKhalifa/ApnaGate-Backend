'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('role_permissions', {
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            role_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "roles",
                    key: "id",
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            permission_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
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

        await queryInterface.addIndex('role_permissions', {
            fields: ['role_id', 'permission_id'],
            unique: true,
            name: 'role_permissions_role_id_permission_id_unique'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('role_permissions');
    }
};