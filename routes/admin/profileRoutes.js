const express = require('express');
const ProfileController = require('../../controllers/ProfileController');
const ProfileValidator = require('../../validators/ProfileValidator');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const { makeUploader } = require('../../utils/UploadUtils');

const router = express.Router();
const userUpload = makeUploader("users");
router.use(authMiddleware);

router.get(
    "/",
    checkPermission("profile.view"),
    ProfileController.getProfile
);
router.put(
    "/",
    checkPermission("profile.update"),
    userUpload.single("profile_image"),
    ProfileValidator.updateProfileValidator,
    validateRequest,
    ProfileController.updateProfile
);
router.put(
    "/change-password",
    checkPermission("profile.update"),
    ProfileValidator.changePasswordValidator,
    validateRequest,
    ProfileController.changePassword
);

module.exports = router;