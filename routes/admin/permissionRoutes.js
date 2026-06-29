const express = require('express');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const rolePermissionController = require('../../controllers/RolePermissionController');
const rolePermissionValidator = require('../../validators/RolePermissionValidator');

const router = express.Router();
router.use(authMiddleware);

router.post(
    '/',
    rolePermissionValidator.createPermissionValidator,
    validateRequest,
    rolePermissionController.createPermission
);
router.get(
    '/',
    rolePermissionController.getAllPermissions
);
router.get(
    '/:id',
    rolePermissionValidator.permissionIdValidator,
    validateRequest,
    rolePermissionController.getPermissionById
);
router.put(
    '/:id',
    rolePermissionValidator.updatePermissionValidator,
    validateRequest,
    rolePermissionController.updatePermission
);


module.exports = router;