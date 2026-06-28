const { body, param } = require('express-validator');

class SocietyRoleValidator {
    static createRoleValidator = [
        body('society_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_society_id")),

        body('name')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('name_ar')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_ar_min_length")),

        body('description')
            .optional()
            .isString().withMessage((value, { req }) => req.t("validation.description_must_be_string")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status")),

        body('permissionKeys')
            .optional()
            .isArray().withMessage((value, { req }) => req.t("validation.permissions_must_be_array"))
            .bail()
            .custom((arr) => arr.every(item => typeof item === 'string')).withMessage((value, { req }) => req.t("validation.invalid_permission_keys"))
    ];

    static updateRoleValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_role_id")),

        body('name')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('name_ar')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_ar_min_length")),

        body('description')
            .optional()
            .isString().withMessage((value, { req }) => req.t("validation.description_must_be_string")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status")),

        body('permissionKeys')
            .optional()
            .isArray().withMessage((value, { req }) => req.t("validation.permissions_must_be_array"))
            .bail()
            .custom((arr) => arr.every(item => typeof item === 'string')).withMessage((value, { req }) => req.t("validation.invalid_permission_keys"))
    ];

    static societyRoleIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_role_id"))
    ];
}

module.exports = SocietyRoleValidator;
