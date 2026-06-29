const { body } = require('express-validator');

class ResidentAuthValidator {
    static registerValidator = [
        body("name")
            .notEmpty().withMessage((value, { req }) => req.t("validation.name_required")),

        body("email")
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body("password")
            .notEmpty().withMessage((value, { req }) => req.t("validation.password_required"))
            .bail()
            .isLength({ min: 6 }).withMessage((value, { req }) => req.t("validation.password_min_length")),

        body("phone")
            .notEmpty().withMessage((value, { req }) => req.t("validation.phone_required")),

        body("society_id")
            .notEmpty().withMessage((value, { req }) => req.t("validation.society_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.society_invalid")),

        body("flat_id")
            .notEmpty().withMessage((value, { req }) => req.t("validation.flat_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.flat_invalid")),

        body("resident_type")
            .notEmpty().withMessage((value, { req }) => req.t("validation.resident_type_required"))
            .bail()
            .isIn(['owner', 'tenant']).withMessage((value, { req }) => req.t("validation.resident_type_invalid")),

        body("moveInDate")
            .notEmpty().withMessage((value, { req }) => req.t("validation.move_in_date_required"))
    ];

    static loginValidator = [
        body("email")
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid")),

        body("password")
            .notEmpty().withMessage((value, { req }) => req.t("validation.password_required"))
            .bail()
            .isLength({ min: 6 }).withMessage((value, { req }) => req.t("validation.password_min_length")),
    ];

    static refreshTokenValidator = [
        (req, res, next) => {
            const refreshToken = req.headers['x-refresh-token'] || req.headers['refresh-token'];
            if (!refreshToken) {
                return res.fail(req.t("validation.refresh_required"), 400);
            }
            req.refreshToken = refreshToken;
            next();
        }
    ];

    static forgotPasswordValidator = [
        body("email")
            .notEmpty().withMessage((value, { req }) => req.t("validation.email_required"))
            .bail()
            .isEmail().withMessage((value, { req }) => req.t("validation.email_invalid"))
    ];

    static resetPasswordValidator = [
        body("resetToken")
            .notEmpty().withMessage((value, { req }) => req.t("validation.reset_token_required")),

        body("newPassword")
            .notEmpty().withMessage((value, { req }) => req.t("validation.new_password_required"))
            .bail()
            .isLength({ min: 6 }).withMessage((value, { req }) => req.t("validation.password_min_length"))
    ];
}

module.exports = ResidentAuthValidator;
