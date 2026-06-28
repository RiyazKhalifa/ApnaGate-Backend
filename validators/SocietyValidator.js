const { body, param } = require('express-validator');

class SocietyValidator {
    static createSocietyValidator = [
        body("name")
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.society_name_min_length")),

        body("name_ar")
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_name_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.society_name_ar_min_length")),

        body("email")
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body("phone")
            .notEmpty().withMessage((value, { req }) => req.t("validation.phone_required")),

        body("registration_no")
            .optional({ checkFalsy: true }),

        body("address")
            .notEmpty().withMessage((value, { req }) => req.t("validation.address_required")),

        body("city")
            .notEmpty().withMessage((value, { req }) => req.t("validation.city_required")),

        body("district")
            .notEmpty().withMessage((value, { req }) => req.t("validation.district_required")),

        body("state")
            .notEmpty().withMessage((value, { req }) => req.t("validation.state_required")),

        body("country")
            .notEmpty().withMessage((value, { req }) => req.t("validation.country_required")),

        body("zipcode")
            .optional({ checkFalsy: true })
    ];

    static updateSocietyValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_society_id")),

        body("name")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_name_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.society_name_min_length")),

        body("name_ar")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_name_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.society_name_ar_min_length")),

        body("email")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body("phone")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.phone_required")),

        body("registration_no")
            .optional({ checkFalsy: true }),

        body("address")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.address_required")),

        body("city")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.city_required")),

        body("district")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.district_required")),

        body("state")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.state_required")),

        body("country")
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.country_required")),

        body("zipcode")
            .optional({ checkFalsy: true })
    ];

    static societyIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_society_id"))
    ];
}

module.exports = SocietyValidator;
