"use strict";

const { body, param } = require("express-validator");

class NotificationValidator {
    static storeValidator = [
        body("customer_id")
            .notEmpty().withMessage((value, { req }) => req.t("validation.customer_id_required")),
        body("title")
            .notEmpty().withMessage((value, { req }) => req.t("validation.title_required"))
            .isLength({ min: 2 }).withMessage((value, { req }) => req.t("validation.title_min_length")),
        body("message")
            .notEmpty().withMessage((value, { req }) => req.t("validation.message_required")),
        body("type")
            .optional()
            .isIn(["admin", "customer"]).withMessage((value, { req }) => req.t("validation.invalid_type"))
    ];

    static idValidator = [
        param("id")
            .notEmpty().withMessage((value, { req }) => req.t("validation.id_required"))
            .isInt().withMessage((value, { req }) => req.t("validation.id_must_be_number"))
    ];
}

module.exports = NotificationValidator;
