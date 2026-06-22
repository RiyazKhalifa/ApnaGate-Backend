'use strict';

const { SiteSetting } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        const siteSettings = [
            { site_key: 'instagram_url', site_value: 'https://www.instagram.com/' },
            { site_key: 'twitter_url', site_value: 'https://twitter.com/' },
            { site_key: 'facebook_url', site_value: 'https://www.facebook.com/' }
        ];

        for (const setting of siteSettings) {
            await SiteSetting.findOrCreate({
                where: { site_key: setting.site_key },
                defaults: setting
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('site_settings', {
            site_key: {
                [Sequelize.Op.in]: ['instagram_url', 'twitter_url', 'facebook_url']
            }
        }, {});
    }
};