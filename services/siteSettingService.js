const { SiteSetting, sequelize } = require("../models");

class SiteSettingService {
    static async updateMultipleSiteSettings(settingsObject) {
        const transaction = await sequelize.transaction();
        try {
            const updatedSettings = [];
            for (const [site_key, site_value] of Object.entries(settingsObject)) {
                const setting = await SiteSetting.findOne({ where: { site_key }, transaction });
                if (!setting) {
                    throw { status: 404, message: "errors.invalid_site_key", data: 404 };
                }
                setting.site_value = site_value;
                await setting.save({ transaction });
                updatedSettings.push(setting);
            }
            await transaction.commit();
            return updatedSettings;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    static async getAllSiteSettings() {
        return await SiteSetting.findAll({
            attributes: ['site_key', 'site_value'],
            order: [['created_at', 'DESC']]
        });
    }
}

module.exports = SiteSettingService;