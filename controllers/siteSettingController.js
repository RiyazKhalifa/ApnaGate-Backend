const SiteSettingService = require("../services/SiteSettingService");

class SiteSettingController {
    static async getAllSiteSettings(req, res) {
        try {
            const settings = await SiteSettingService.getAllSiteSettings();
            return res.success("messages.site_settings_retrieved", settings);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateMultipleSiteSettings(req, res) {
        try {
            const reqBody = req.body;
            const updatedSettings = await SiteSettingService.updateMultipleSiteSettings(reqBody);
            return res.success("messages.site_settings_updated", updatedSettings);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = SiteSettingController;