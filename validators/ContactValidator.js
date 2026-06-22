const { param, body } = require("express-validator");

module.exports = {
    contactIdValidator: [
        param("id").isInt().withMessage("validation.contact_id_invalid")
    ],
    replyValidator: [
        body("reply").notEmpty().withMessage("validation.reply_required")
    ]
};
