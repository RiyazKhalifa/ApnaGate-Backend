const { body, param } = require('express-validator');

class SiteSettingValidator {
    static updateMultipleSiteSettingsValidator = [
        body()
            .isObject().withMessage((value, { req }) => req.t("validation.site_settings_must_be_object"))
            .bail()
            .custom((value, { req }) => {
                for (const [key, val] of Object.entries(value)) {
                    if (typeof key !== 'string' || key.trim() === '') {
                        throw new Error(req.t("validation.site_key_required"));
                    }
                    if (typeof val !== 'string') {
                        throw new Error(req.t("validation.site_value_must_be_string"));
                    }
                }
                return true;
            })
    ];
}

module.exports = SiteSettingValidator;