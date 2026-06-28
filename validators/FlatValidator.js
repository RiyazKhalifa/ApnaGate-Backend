const { body, param } = require('express-validator');

class FlatValidator {
    static createFlatValidator = [
        body('society_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_society_id")),

        body('block_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.block_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_block_id")),

        body('tower_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.tower_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_tower_id")),

        body('floor_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.floor_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_floor_id")),

        body('flat_number')
            .notEmpty().withMessage((value, { req }) => req.t("validation.flat_number_required"))
            .bail()
            .isString().withMessage((value, { req }) => req.t("validation.flat_number_must_be_string")),

        body('type')
            .notEmpty().withMessage((value, { req }) => req.t("validation.flat_type_required"))
            .bail()
            .isIn(['1BHK', '2BHK', '3BHK', '4BHK', 'VILLA']).withMessage((value, { req }) => req.t("validation.invalid_flat_type")),

        body('area')
            .optional()
            .isDecimal().withMessage((value, { req }) => req.t("validation.area_must_be_decimal")),

        body('parking_slots')
            .optional()
            .isInt({ min: 0 }).withMessage((value, { req }) => req.t("validation.parking_slots_must_be_non_negative")),

        body('status')
            .optional()
            .isIn(['occupied', 'vacant', 'maintenance']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static updateFlatValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id")),

        body('block_id')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_block_id")),

        body('tower_id')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_tower_id")),

        body('floor_id')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_floor_id")),

        body('flat_number')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.flat_number_required")),

        body('type')
            .optional()
            .isIn(['1BHK', '2BHK', '3BHK', '4BHK', 'VILLA']).withMessage((value, { req }) => req.t("validation.invalid_flat_type")),

        body('area')
            .optional()
            .isDecimal().withMessage((value, { req }) => req.t("validation.area_must_be_decimal")),

        body('parking_slots')
            .optional()
            .isInt({ min: 0 }).withMessage((value, { req }) => req.t("validation.parking_slots_must_be_non_negative")),

        body('status')
            .optional()
            .isIn(['occupied', 'vacant', 'maintenance']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static flatIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id"))
    ];
}

module.exports = FlatValidator;
