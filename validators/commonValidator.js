const { body } = require('express-validator');

class CommonValidator {
    static updateStatusValidator = [
        body('module')
            .notEmpty().withMessage((value, { req }) => req.t("validation.module_required"))
            .bail()
            .isIn(['user', 'faq', 'role', 'contact', 'society', 'society_role', 'society_user', 'block', 'tower', 'floor', 'flat']).withMessage((value, { req }) => req.t("validation.invalid_module")),

        body('id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.id_must_be_number")),

        body('status')
            .notEmpty().withMessage((value, { req }) => req.t("validation.status_required"))
            .bail()
            .isIn(['active', 'inactive', 'pending', 'suspended', 'occupied', 'vacant', 'maintenance']).withMessage((value, { req }) => req.t("validation.invalid_status"))
    ];

    static deleteValidator = [
        body('module')
            .notEmpty().withMessage((value, { req }) => req.t("validation.module_required"))
            .bail()
            .isIn(['user', 'faq', 'role', 'permission', 'contact', 'society', 'society_role', 'society_user', 'block', 'tower', 'floor', 'flat']).withMessage((value, { req }) => req.t("validation.invalid_module")),

        body('id')
            .notEmpty().withMessage((value, { req }) => req.t("validation.id_required"))
            .bail()
            .isInt().withMessage((value, { req }) => req.t("validation.id_must_be_number"))
    ];

    static adjustSequenceValidator = [
        body('module')
            .notEmpty().withMessage((value, { req }) => req.t('validation.module_required'))
            .isIn(['faq'])
            .withMessage((value, { req }) => req.t('validation.invalid_module')),

        body('sequences')
            .isArray({ min: 1 })
            .withMessage((value, { req }) => req.t('validation.sequence_array_required')),

        body('sequences.*.id')
            .isInt().withMessage((value, { req }) => req.t('validation.id_must_be_number')),

        body('sequences.*.sequence')
            .isInt({ min: 1 }).withMessage((value, { req }) => req.t('validation.sequence_must_be_positive_integer'))
    ];
}

module.exports = CommonValidator;