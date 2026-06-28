const { body, param } = require('express-validator');

class FloorValidator {
    static createFloorValidator = [
        body('tower_id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.tower_id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_tower_id")),

        body('floor_number')
            .notEmpty().withMessage((value, { req }) => req.t("validation.floor_number_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.floor_number_must_be_integer")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static updateFloorValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id")),

        body('tower_id')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_tower_id")),

        body('floor_number')
            .optional()
            .isInt().withMessage((value, { req }) => req.t("validation.floor_number_must_be_integer")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static floorIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_id"))
    ];
}

module.exports = FloorValidator;
