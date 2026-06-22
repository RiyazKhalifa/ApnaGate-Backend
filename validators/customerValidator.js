const { param } = require('express-validator');

class CustomerValidator {
    static customerIdValidator = [
        param("id")
            .isInt().withMessage((value, { req }) => req.t("validation.invalid_customer_id"))
    ];
}

module.exports = CustomerValidator;