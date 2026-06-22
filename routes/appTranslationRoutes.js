const express = require("express");
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");
const validateRequest = require("../middlewares/ValidateRequest");
const appTranslationController = require("../controllers/AppTranslationController");

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/languages",
    checkPermission("app_translation.list"),
    appTranslationController.getLanguages
);

router.post(
    "/languages",
    checkPermission("app_translation.create"),
    appTranslationController.createLanguage
);

router.get(
    "/translations/:langCode",
    checkPermission("app_translation.view"),
    appTranslationController.getTranslations
);

router.post(
    "/add-key",
    checkPermission("app_translation.update"),
    appTranslationController.addKey
);

router.put(
    "/translations/:langCode",
    checkPermission("app_translation.update"),
    appTranslationController.updateTranslations
);

module.exports = router;
