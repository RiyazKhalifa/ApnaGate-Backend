'use strict';

const { Cms } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        const cmsPages = [
            {
                title: 'Terms and Conditions',
                title_ar: 'الشروط والأحكام',
                content: 'This is the terms and conditions content.',
                content_ar: 'هذا هو محتوى الشروط والأحكام.',
                slug: 'terms'
            },
            {
                title: 'Privacy Policy',
                title_ar: 'سياسة الخصوصية',
                content: 'This is the privacy policy content.',
                content_ar: 'هذا هو محتوى سياسة الخصوصية.',
                slug: 'privacy-policy'
            }
        ];

        for (const page of cmsPages) {
            await Cms.findOrCreate({
                where: { slug: page.slug },
                defaults: page
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('cms', { slug: ['terms', 'privacy-policy'] }, {});
    }
};