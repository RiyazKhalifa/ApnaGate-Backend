const { body, param } = require('express-validator');

class BlockValidator {
    static createBlockValidator = [
        body('society_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_society_id")),

        body('name')
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 1 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('description')
            .optional()
            .isString().withMessage((value, { req }) => req.t("validation.description_must_be_string")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static updateBlockValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id")),

        body('name')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required"))
            .bail()
            .isLength({ min: 1 }).withMessage((value, { req }) => req.t("validation.name_min_length")),

        body('description')
            .optional()
            .isString().withMessage((value, { req }) => req.t("validation.description_must_be_string")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static blockIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id"))
    ];
}

module.exports = BlockValidator;
