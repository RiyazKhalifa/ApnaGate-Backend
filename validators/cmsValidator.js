const { body, param } = require('express-validator');

class CmsValidator {
    static updateCmsValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_cms_id")),

        body('title')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.title_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.title_min_length")),

        body('title_ar')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.title_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.title_ar_min_length")),

        body('content')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.content_required")),

        body('content_ar')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.content_ar_required")),

        body('slug')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.slug_required"))
            .bail()
            .isSlug().withMessage((value, { req }) => req.t("validation.invalid_slug"))
    ];

    static cmsIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_cms_id"))
    ];
}

module.exports = CmsValidator;