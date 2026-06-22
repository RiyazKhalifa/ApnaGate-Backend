"use strict";

const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/NotificationController");
const NotificationValidator = require("../validators/NotificationValidator");
const validateRequest = require("../middlewares/ValidateRequest");
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");

// All notification routes require authentication
router.use(authMiddleware);

router.get("/", 
    checkPermission("notification.list"), 
    NotificationController.index
);

module.exports = router;
