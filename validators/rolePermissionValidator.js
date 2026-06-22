const { body, param } = require('express-validator');

class RolePermissionValidator {
    static createRoleValidator = [
        body('name')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('name_ar')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_ar_min_length")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status")),

        body('permissionIds')
            .notEmpty().withMessage((value, { req }) => req.t("validation.permission_required"))
            .bail()
            .isArray().withMessage((value, { req }) => req.t("validation.permissions_must_be_array"))
            .bail()
            .custom((arr) => arr.every(Number.isInteger)).withMessage((value, { req }) => req.t("validation.invalid_permission_ids"))
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

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status")),

        body('permissionIds')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.permission_required"))
            .bail()
            .isArray().withMessage((value, { req }) => req.t("validation.permissions_must_be_array"))
            .bail()
            .custom((arr) => arr.every(Number.isInteger)).withMessage((value, { req }) => req.t("validation.invalid_permission_ids"))
    ];

    static roleIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_role_id"))
    ];

    static createPermissionValidator = [
        body('name')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('name_ar')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.name_ar_min_length")),
    ];

    static updatePermissionValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_permission_id")),

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
    ];

    static permissionIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_permission_id"))
    ];
}

module.exports = RolePermissionValidator;