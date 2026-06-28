const { body, param } = require('express-validator');

class TowerValidator {
    static createTowerValidator = [
        body('block_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.block_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_block_id")),

        body('name')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 1 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('floors_count')
            .notEmpty().withMessage((value, { req }) => req.t("validation.floors_count_required"))
            .bail()
            .isInt({ min: 0 }).withMessage((value, { req }) => req.t("validation.floors_count_must_be_non_negative")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static updateTowerValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id")),

        body('block_id')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_block_id")),

        body('name')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 1 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('floors_count')
            .optional()
            .isInt({ min: 0 }).withMessage((value, { req }) => req.t("validation.floors_count_must_be_non_negative")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static towerIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id"))
    ];
}

module.exports = TowerValidator;
