const express = require('express');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const appSettingController = require('../../controllers/AppSettingController');
const appSettingValidator = require('../../validators/AppSettingValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    "/",
    checkPermission("app_setting.list"), // Using existing permission as decided
    appSettingController.getAllAppSettings,
);
router.put(
    "/",
    checkPermission("app_setting.update"), // Using existing permission as decided
    appSettingValidator.updateMultipleAppSettingsValidator,
    validateRequest,
    appSettingController.updateMultipleAppSettings,
);

module.exports = router;
