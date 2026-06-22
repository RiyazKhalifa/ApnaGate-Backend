const { AppSetting, sequelize } = require("../models");

class AppSettingService {
    static async updateMultipleAppSettings(settingsObject) {
        const transaction = await sequelize.transaction();
        try {
            const updatedSettings = [];

            // Identify unique app names from the keys
            const names = new Set();
            Object.keys(settingsObject).forEach((key) => {
                if (key.endsWith("_version")) {
                    names.add(key.replace("_version", ""));
                } else if (key.endsWith("_compulsory_update")) {
                    names.add(key.replace("_compulsory_update", ""));
                } else if (key === "maintenance_mode" || key === "maintenance_mode_enable") {
                    names.add("maintenance_mode");
                } else {
                    // Fallback for any other keys
                    names.add(key);
                }
            });

            // Iterate over each identified name and update the DB
            for (const name of names) {
                let settingValue;
                let compulsoryValue;

                if (name === "maintenance_mode") {
                    settingValue = settingsObject.maintenance_mode;
                    compulsoryValue = settingsObject.maintenance_mode_enable;
                } else {
                    settingValue = settingsObject[`${name}_version`] ?? settingsObject[name];
                    compulsoryValue = settingsObject[`${name}_compulsory_update`];
                }

                if (settingValue === undefined && compulsoryValue === undefined) continue;

                let row = await AppSetting.findOne({
                    where: { name: name },
                    transaction,
                });

                if (!row) {
                    row = await AppSetting.create(
                        {
                            name: name,
                            setting: String(settingValue || ""),
                            compulsory: compulsoryValue ? 1 : 0,
                        },
                        { transaction },
                    );
                } else {
                    if (settingValue !== undefined) row.setting = String(settingValue);
                    if (compulsoryValue !== undefined) row.compulsory = compulsoryValue ? 1 : 0;
                    await row.save({ transaction });
                }
                updatedSettings.push(row);
            }

            await transaction.commit();
            return updatedSettings;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async getAllAppSettings() {
        const rows = await AppSetting.findAll({
            order: [["created_at", "DESC"]],
        });

        const flatSettings = {};

        rows.forEach((row) => {
            if (row.name === "maintenance_mode") {
                flatSettings.maintenance_mode = row.setting;
                flatSettings.maintenance_mode_enable = row.compulsory === 1;
            } else {
                flatSettings[`${row.name}_version`] = row.setting;
                flatSettings[`${row.name}_compulsory_update`] = row.compulsory === 1;
            }
        });

        return flatSettings;
    }
}

module.exports = AppSettingService;
