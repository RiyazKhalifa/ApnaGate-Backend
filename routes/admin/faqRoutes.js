const express = require('express');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const faqController = require('../../controllers/FaqController');
const faqValidator = require('../../validators/FaqValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("faq.list"),
    faqController.getAllFaqs
);
router.get(
    '/:id',
    checkPermission("faq.view"),
    faqValidator.faqIdValidator,
    validateRequest,
    faqController.getFaqById
);
router.post(
    '/',
    checkPermission("faq.create"),
    faqValidator.createFaqValidator,
    validateRequest,
    faqController.createFaq
);
router.put(
    '/:id',
    checkPermission("faq.update"),
    faqValidator.updateFaqValidator,
    validateRequest,
    faqController.updateFaq
);

module.exports = router;