"use strict";

const { body, param } = require("express-validator");

class NotificationValidator {
    static storeValidator = [
        body("recipient_type")
            .notEmpty().withMessage((value, { req }) => req.t("validation.recipient_type_required"))
            .isIn(["user", "society_user", "resident"]).withMessage((value, { req }) => req.t("validation.invalid_recipient_type")),
        body("recipient_id")
            .notEmpty().withMessage((value, { req }) => req.t("validation.recipient_id_required"))
            .isInt().withMessage((value, { req }) => req.t("validation.recipient_id_must_be_number")),
        body("title")
            .notEmpty().withMessage((value, { req }) => req.t("validation.title_required"))
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.title_min_length")),
        body("message")
            .notEmpty().withMessage((value, { req }) => req.t("validation.message_required")),
        body("type")
            .notEmpty().withMessage((value, { req }) => req.t("validation.type_required"))
    ];

    static idValidator = [
        param("id")
            .notEmpty().withMessage((value, { req }) => req.t("validation.id_required"))
            .isInt().withMessage((value, { req }) => req.t("validation.id_must_be_number"))
    ];
}

module.exports = NotificationValidator;
