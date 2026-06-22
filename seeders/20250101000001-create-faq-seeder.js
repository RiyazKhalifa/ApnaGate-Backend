'use strict';

const { Faq } = require('../models');

module.exports = {
    async up(queryInterface, Sequelize) {
        const faqs = [
            {
                question: 'What is this service?',
                question_ar: 'ما هذه الخدمة؟',
                answer: 'This is a sample FAQ answer.',
                answer_ar: 'هذا إجابة نموذجية للأسئلة الشائعة.',
                status: 'active',
                sequence: 1
            },
            {
                question: 'How to contact support?',
                question_ar: 'كيفية الاتصال بالدعم؟',
                answer: 'You can contact support via email.',
                answer_ar: 'يمكنك الاتصال بالدعم عبر البريد الإلكتروني.',
                status: 'active',
                sequence: 2
            }
        ];

        for (const faq of faqs) {
            await Faq.findOrCreate({
                where: { question: faq.question },
                defaults: faq
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('faqs', { question: ['What is this service?', 'How to contact support?'] }, {});
    }
};