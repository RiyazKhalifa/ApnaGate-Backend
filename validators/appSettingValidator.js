const { body } = require("express-validator");

class AppSettingValidator {
    static updateMultipleAppSettingsValidator = [
        body()
            .isObject()
            .withMessage((value, { req }) =>
                req.t("validation.app_settings_must_be_object"),
            ),
        // We removed strict key validation because we now accept specific known keys (android_version etc)
        // and ignore others or handle them in service.
        // But we might want to validate the values if present.
        // For now, simple object check is sufficient as service handles logic.
    ];
}

module.exports = AppSettingValidator;
