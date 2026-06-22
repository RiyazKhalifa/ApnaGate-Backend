const AppTranslationService = require("../services/AppTranslationService");

class AppTranslationController {
    static async getLanguages(req, res) {
        try {
            const languages = await AppTranslationService.getAllLanguages();
            return res.success("messages.languages_retrieved", languages);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status || 500);
        }
    }

    static async getTranslations(req, res) {
        try {
            const { langCode } = req.params;
            const data = await AppTranslationService.getTranslationsByLang(langCode);
            if (!data) {
                return res.fail("messages.language_not_found", 404);
            }
            return res.success("messages.translations_retrieved", data);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status || 500);
        }
    }

    static async addKey(req, res) {
        try {
            const { key, value, appType } = req.body;
            if (!key) {
                return res.fail("validation.required", 400);
            }
            if (appType !== 'customer') {
                return res.fail("validation.invalid_app_type", 400);
            }

            await AppTranslationService.addKeyToAllLanguages(key, value, appType);
            return res.success("messages.key_added_successfully");
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status || 500);
        }
    }

    static async updateTranslations(req, res) {
        try {
            const { langCode } = req.params;
            const { appType, translations, lang_name, direction } = req.body;

            if (appType !== 'customer') {
                return res.fail("validation.invalid_app_type", 400);
            }

            await AppTranslationService.updateTranslations(langCode, appType, translations, { lang_name, direction });
            return res.success("messages.translations_updated_successfully");
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status || 500);
        }
    }

    static async createLanguage(req, res) {
        try {
            const data = req.body;
            const newLang = await AppTranslationService.createLanguage(data);
            return res.success("messages.language_created", newLang, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status || 500);
        }
    }
}

module.exports = AppTranslationController;
