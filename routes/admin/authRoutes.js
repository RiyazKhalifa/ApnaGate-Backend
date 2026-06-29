const AuthController = require('../../controllers/AuthController');
const AuthValidator = require('../../validators/AuthValidator');
const ValidateRequest = require('../../middlewares/ValidateRequest');
const AuthMiddleware = require('../../middlewares/AuthMiddleware');

const express = require('express');
const router = express.Router();

router.post(
    "/login",
    AuthValidator.loginValidator,
    ValidateRequest,
    AuthController.login
);
router.post(
    "/refresh",
    AuthValidator.refreshTokenValidator,
    ValidateRequest,
    AuthController.refresh
);
router.post(
    "/logout",
    AuthValidator.refreshTokenValidator,
    ValidateRequest,
    AuthController.logout
);
router.post(
    "/forgot-password",
    AuthValidator.forgotPasswordValidator,
    ValidateRequest,
    AuthController.forgotPassword
);
router.post(
    "/reset-password",
    AuthValidator.resetPasswordValidator,
    ValidateRequest,
    AuthController.resetPassword
);
router.get(
    "/force-logout",
    AuthController.forceLogout
);

router.post(
    "/verify-password",
    AuthMiddleware,
    AuthValidator.verifyPasswordValidator,
    ValidateRequest,
    AuthController.verifyPassword,
);

module.exports = router;