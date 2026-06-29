const express = require('express');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const cmsController = require('../../controllers/CmsController');
const cmsValidator = require('../../validators/CmsValidator');

const router = express.Router();
router.use(authMiddleware);

router.get(
    '/',
    checkPermission("cms.list"),
    cmsController.getAllCms
);
router.get(
    '/:id',
    checkPermission("cms.view"),
    cmsValidator.cmsIdValidator,
    validateRequest,
    cmsController.getCmsById
);
router.put(
    '/:id',
    checkPermission("cms.update"),
    cmsValidator.updateCmsValidator,
    validateRequest,
    cmsController.updateCms
);

module.exports = router;