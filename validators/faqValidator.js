const { body, param } = require('express-validator');

class FaqValidator {
    static createFaqValidator = [
        body('question')
            .notEmpty().withMessage((value, { req }) => req.t("validation.question_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.question_min_length")),

        body('question_ar')
            .notEmpty().withMessage((value, { req }) => req.t("validation.question_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.question_ar_min_length")),

        body('answer')
            .notEmpty().withMessage((value, { req }) => req.t("validation.answer_required")),

        body('answer_ar')
            .notEmpty().withMessage((value, { req }) => req.t("validation.answer_ar_required")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static updateFaqValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_faq_id")),

        body('question')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.question_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.question_min_length")),

        body('question_ar')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.question_ar_required"))
            .bail()
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.question_ar_min_length")),

        body('answer')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.answer_required")),

        body('answer_ar')
            .optional()
            .notEmpty().withMessage((value, { req }) => req.t("validation.answer_ar_required")),

        body('status')
            .optional()
            .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static faqIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_faq_id"))
    ];
}

module.exports = FaqValidator;