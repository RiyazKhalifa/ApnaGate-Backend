const { body, param } = require('express-validator');

class UserValidator {
    static createUserValidator = [
        body("name")
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body("email")
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body("roleId")
            .notEmpty().withMessage((value, { req }) => req.t("validation.role_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.role_must_be_number"))
    ];

    static updateUserValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_user_id")),

        body("name")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body("email")
            .optional()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body("roleId")
            .notEmpty().withMessage((value, { req }) => req.t("validation.role_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.role_must_be_number"))
    ];

    static userIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_user_id"))
    ];
}

module.exports = UserValidator;