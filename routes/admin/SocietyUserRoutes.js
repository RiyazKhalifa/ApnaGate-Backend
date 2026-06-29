const express = require('express');
const SocietyUserController = require('../../controllers/SocietyUserController');
const SocietyUserValidator = require('../../validators/SocietyUserValidator');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const { makeUploader } = require('../../utils/UploadUtils');

const router = express.Router();
const societyUserUpload = makeUploader("society_users");

router.use(authMiddleware);

router.get(
    "/",
    checkPermission("society_user.list"),
    SocietyUserController.getAllSocietyUsers
);

router.get(
    "/:id",
    checkPermission("society_user.view"),
    SocietyUserValidator.societyUserIdValidator,
    validateRequest,
    SocietyUserController.getSocietyUserById
);

router.post(
    "/",
    checkPermission("society_user.create"),
    societyUserUpload.single("profile_image"),
    SocietyUserValidator.createSocietyUserValidator,
    validateRequest,
    SocietyUserController.createSocietyUser
);

router.put(
    "/:id",
    checkPermission("society_user.update"),
    societyUserUpload.single("profile_image"),
    SocietyUserValidator.updateSocietyUserValidator,
    validateRequest,
    SocietyUserController.updateSocietyUser
);

router.delete(
    "/:id",
    checkPermission("society_user.delete"),
    SocietyUserValidator.societyUserIdValidator,
    validateRequest,
    SocietyUserController.deleteSocietyUser
);

module.exports = router;
