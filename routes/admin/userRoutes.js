const express = require('express');
const UserController = require('../../controllers/UserController');
const UserValidator = require('../../validators/UserValidator');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const { makeUploader } = require('../../utils/UploadUtils');

const router = express.Router();
const userUpload = makeUploader("users");
router.use(authMiddleware);

router.get(
    "/",
    checkPermission("user.view"),
    UserController.getAllUsers
);
router.get(
    "/:id",
    checkPermission("user.view"),
    UserValidator.userIdValidator,
    validateRequest,
    UserController.getUserById
);
router.post(
    "/",
    checkPermission("user.create"),
    userUpload.single("profile_image"),
    UserValidator.createUserValidator,
    validateRequest,
    UserController.createUser
);
router.put(
    "/:id",
    checkPermission("user.update"),
    userUpload.single("profile_image"),
    UserValidator.updateUserValidator,
    validateRequest,
    UserController.updateUser
);
router.delete(
    "/:id",
    checkPermission("user.delete"),
    UserValidator.userIdValidator,
    validateRequest,
    UserController.deleteUser
);

module.exports = router;