"use strict";

const { AppSetting } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const app_settings = [
            { name: "maintenance_mode", setting: "0", compulsory: 0 },
            { name: "android", setting: "1.0.0", compulsory: 0 },
            { name: "ios", setting: "1.0.0", compulsory: 0 },
        ];

        // if (!Array.isArray(app_settings) || app_settings.length === 0) {
        //     return;
        // }

        for (const appSetting of app_settings) {
            const existing = await AppSetting.findOne({
                where: { name: appSetting.name },
            });

            if (!existing) {
                await queryInterface.bulkInsert(
                    "app_settings",
                    [
                        {
                            name: appSetting.name,
                            setting: appSetting.setting,
                            compulsory: appSetting.compulsory,
                            created_at: new Date(),
                            updated_at: new Date(),
                        },
                    ],
                    {},
                );
                console.log(`App setting Inserted: ${appSetting.name}`);
            } else {
                console.log(`App setting already exists: ${appSetting.name}`);
            }
        }
    },

    async down(queryInterface, Sequelize) {
        const appNames = [
            "android",
            "ios",
            "android_driver",
            "ios_driver",
            "maintenance_mode",
        ];
        await queryInterface.bulkDelete(
            "app_settings",
            {
                name: appNames,
            },
            {},
        );
    },
};
