'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('poll_votes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            poll_option_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'poll_options',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            resident_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'residents',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });

        // Add unique index on resident_id and poll_option_id
        await queryInterface.addIndex('poll_votes', {
            fields: ['resident_id', 'poll_option_id'],
            unique: true,
            name: 'poll_votes_resident_poll_option_unique'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('poll_votes');
    }
};
