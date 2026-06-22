const AppSettingService = require("../services/AppSettingService");

class AppSettingController {
    static async getAllAppSettings(req, res) {
        try {
            const settings = await AppSettingService.getAllAppSettings();
            return res.success("messages.app_settings_retrieved", settings);
        } catch (error) {
            return res.fail(
                error.message || "errors.internal_error",
                error.status,
            );
        }
    }

    static async updateMultipleAppSettings(req, res) {
        try {
            const reqBody = req.body;
            const updatedSettings =
                await AppSettingService.updateMultipleAppSettings(reqBody);
            return res.success(
                "messages.app_settings_updated",
                updatedSettings,
            );
        } catch (error) {
            return res.fail(
                error.message || "errors.internal_error",
                error.status,
            );
        }
    }
}

module.exports = AppSettingController;
