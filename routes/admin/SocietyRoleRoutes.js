const express = require('express');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const SocietyRoleController = require('../../controllers/SocietyRoleController');
const SocietyRoleValidator = require('../../validators/SocietyRoleValidator');

const router = express.Router();
router.use(authMiddleware);

router.post(
    '/',
    checkPermission("society_role.create"),
    SocietyRoleValidator.createRoleValidator,
    validateRequest,
    SocietyRoleController.createSocietyRole
);

router.get(
    '/permissions',
    checkPermission("society_role.create"),
    SocietyRoleController.getAvailablePermissions
);

router.get(
    '/',
    checkPermission("society_role.list"),
    SocietyRoleController.getAllSocietyRoles
);

router.get(
    '/:id',
    checkPermission("society_role.view"),
    SocietyRoleValidator.societyRoleIdValidator,
    validateRequest,
    SocietyRoleController.getSocietyRoleById
);

router.put(
    '/:id',
    checkPermission("society_role.update"),
    SocietyRoleValidator.updateRoleValidator,
    validateRequest,
    SocietyRoleController.updateSocietyRole
);

router.delete(
    '/:id',
    checkPermission("society_role.delete"),
    SocietyRoleValidator.societyRoleIdValidator,
    validateRequest,
    SocietyRoleController.deleteSocietyRole
);

module.exports = router;
