const { body, param } = require('express-validator');

class SocietyUserValidator {
    static createSocietyUserValidator = [
        body('society_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_society_id")),

        body('society_role_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.role_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.role_must_be_number")),

        body('name')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('email')
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body('phone')
            .notEmpty().withMessage((value, { req }) => req.t("validation.phone_required"))
            .bail()
            .isString().withMessage((value, { req }) => req.t("validation.phone_must_be_string")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static updateSocietyUserValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_user_id")),

        body('society_role_id')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.role_must_be_number")),

        body('name')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('email')
            .optional()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body('phone')
            .notEmpty().withMessage((value, { req }) => req.t("validation.phone_required"))
            .bail()
            .isString().withMessage((value, { req }) => req.t("validation.phone_must_be_string")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static societyUserIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_user_id"))
    ];
}

module.exports = SocietyUserValidator;
