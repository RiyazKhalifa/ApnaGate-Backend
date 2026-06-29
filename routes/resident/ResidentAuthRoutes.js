const ResidentAuthController = require('../../controllers/ResidentAuthController');
const ResidentAuthValidator = require('../../validators/ResidentAuthValidator');
const ValidateRequest = require('../../middlewares/ValidateRequest');

const express = require('express');
const router = express.Router();

router.post(
    "/register",
    ResidentAuthValidator.registerValidator,
    ValidateRequest,
    ResidentAuthController.register
);

router.post(
    "/login",
    ResidentAuthValidator.loginValidator,
    ValidateRequest,
    ResidentAuthController.login
);

router.post(
    "/refresh",
    ResidentAuthValidator.refreshTokenValidator,
    ValidateRequest,
    ResidentAuthController.refresh
);

router.post(
    "/logout",
    ResidentAuthValidator.refreshTokenValidator,
    ValidateRequest,
    ResidentAuthController.logout
);

router.post(
    "/forgot-password",
    ResidentAuthValidator.forgotPasswordValidator,
    ValidateRequest,
    ResidentAuthController.forgotPassword
);

router.post(
    "/reset-password",
    ResidentAuthValidator.resetPasswordValidator,
    ValidateRequest,
    ResidentAuthController.resetPassword
);

module.exports = router;
