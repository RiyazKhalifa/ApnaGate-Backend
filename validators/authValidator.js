const { body } = require('express-validator');

class AuthValidator {
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

    static verifyPasswordValidator = [
        body("password")
            .notEmpty().withMessage((value, { req }) => req.t("validation.password_required"))
    ];
}

module.exports = AuthValidator;