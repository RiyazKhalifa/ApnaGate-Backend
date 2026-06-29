const express = require('express');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const siteSettingController = require('../../controllers/SiteSettingController');
const siteSettingValidator = require('../../validators/SiteSettingValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("site_setting.list"),
    siteSettingController.getAllSiteSettings
);
router.put(
    '/',
    checkPermission("site_setting.update"),
    siteSettingValidator.updateMultipleSiteSettingsValidator,
    validateRequest,
    siteSettingController.updateMultipleSiteSettings
);

module.exports = router;