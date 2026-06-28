'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('complaint_comments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            complaint_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'complaints',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            user_type: {
                type: Sequelize.ENUM('user', 'society_user', 'resident'),
                allowNull: false
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            comment: {
                type: Sequelize.TEXT,
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

        // Add index on user_type and user_id for polymorphic comments lookup
        await queryInterface.addIndex('complaint_comments', ['user_type', 'user_id']);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('complaint_comments');
    }
};
