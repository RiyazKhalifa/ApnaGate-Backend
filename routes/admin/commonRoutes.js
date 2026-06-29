const express = require('express');
const CommonController = require('../../controllers/CommonController');
const CommonValidator = require('../../validators/CommonValidator');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');

const router = express.Router();
router.use(authMiddleware);

router.put(
    "/status",
    checkPermission("status.update"),
    CommonValidator.updateStatusValidator,
    validateRequest,
    CommonController.updateStatus
);
router.delete(
    "/delete",
    checkPermission("record.delete"),
    CommonValidator.deleteValidator,
    validateRequest,
    CommonController.delete
);
router.put(
    "/sequence",
    checkPermission("sequence.update"),
    CommonValidator.adjustSequenceValidator,
    validateRequest,
    CommonController.adjustSequence
);

module.exports = router;