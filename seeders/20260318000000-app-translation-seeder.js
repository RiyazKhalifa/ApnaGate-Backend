"use strict";

const { AppTranslation } = require("../models");
const { encrypt, decrypt } = require("../utils/EncryptionUtils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const enCustomer = {
            app_name: "Demo App",
            welcome: "Welcome",
            logout: "Logout",
        };
        const arCustomer = {
            app_name: "تطبيقي",
            welcome: "مرحبا",
            logout: "تسجيل الخروج",
        };

        async function upsertTranslation(lang_code, lang_name, direction, customerData) {
            let record = await AppTranslation.findOne({ where: { lang_code } });
            if (!record) {
                await queryInterface.bulkInsert(
                    "app_translations",
                    [
                        {
                            lang_code,
                            lang_name,
                            direction,
                            customer_translation_data: encrypt(JSON.stringify(customerData)),
                            created_at: new Date(),
                            updated_at: new Date(),
                        },
                    ],
                    {}
                );
            } else {
                // Merge and update only new/changed keys
                let customer = record.customer_translation_data ? JSON.parse(decrypt(record.customer_translation_data) || "{}") : {};
                customer = { ...customerData, ...customer };
                await AppTranslation.update(
                    {
                        customer_translation_data: encrypt(JSON.stringify(customer)),
                        updated_at: new Date(),
                    },
                    { where: { lang_code } }
                );
            }
        }

        await upsertTranslation("en", "English", "ltr", enCustomer);
        await upsertTranslation("ar", "Arabic", "rtl", arCustomer);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("app_translations", { lang_code: ["en", "ar"] }, {});
    },
};
