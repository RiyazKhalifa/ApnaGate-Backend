const express = require('express');
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");
const validateRequest = require("../middlewares/ValidateRequest");
const contactController = require('../controllers/ContactController');
const contactValidator = require('../validators/ContactValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("contact.list"),
    contactController.getAllContacts
);
router.get(
    '/:id',
    checkPermission("contact.view"),
    contactValidator.contactIdValidator,
    validateRequest,
    contactController.getContactById
);
router.post(
    '/:id/reply',
    checkPermission("contact.reply"),
    contactValidator.contactIdValidator,
    contactValidator.replyValidator,
    validateRequest,
    contactController.replyToContact
);

module.exports = router;
