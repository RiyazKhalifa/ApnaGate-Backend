const { body } = require('express-validator');

class ProfileValidator {
    static updateProfileValidator = [
        body("name")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body("email")
            .optional()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid"))
            .normalizeEmail()
    ];

    static changePasswordValidator = [
        body("currentPassword")
            .notEmpty().withMessage((value, { req }) => req.t("validation.current_password_required"))
            .bail()
            .isLength({ min: 6 }).withMessage((value, { req }) => req.t("validation.password_min_length")),

        body("newPassword")
            .notEmpty().withMessage((value, { req }) => req.t("validation.new_password_required"))
            .bail()
            .isLength({ min: 6 }).withMessage((value, { req }) => req.t("validation.password_min_length")),

        body("confirmPassword")
            .notEmpty().withMessage((value, { req }) => req.t("validation.confirm_password_required"))
            .bail()
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error(req.t("validation.passwords_not_match"));
                }
                return true;
            })
    ];
}

module.exports = ProfileValidator;