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
    checkPermission("role.create"),
    rolePermissionValidator.createRoleValidator,
    validateRequest,
    rolePermissionController.createRole
);
router.get(
    '/',
    checkPermission("role.list"),
    rolePermissionController.getAllRoles
);
router.get(
    '/:id',
    checkPermission("role.list"),
    rolePermissionValidator.roleIdValidator,
    validateRequest,
    rolePermissionController.getRoleById
);
router.put(
    '/:id',
    checkPermission("role.update"),
    rolePermissionValidator.updateRoleValidator,
    validateRequest,
    rolePermissionController.updateRole
);
router.delete(
    '/:id',
    checkPermission("role.delete"),
    rolePermissionValidator.roleIdValidator,
    validateRequest,
    rolePermissionController.deleteRole
);

module.exports = router;