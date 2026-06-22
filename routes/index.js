const express = require("express");
const router = express.Router();

const authRoutes = require("./AuthRoutes");
const profileRoutes = require("./ProfileRoutes");
const userRoutes = require("./UserRoutes");
const roleRoutes = require("./RoleRoutes");
const permissionRoutes = require("./PermissionRoutes");
const customerRoutes = require("./CustomerRoutes");
const cmsRoutes = require("./CmsRoutes");
const siteSettingRoutes = require("./SiteSettingRoutes");
const faqRoutes = require("./FaqRoutes");
const commonRoutes = require("./CommonRoutes");
const appSettingRoutes = require("./AppSettingRoutes");
const appTranslationRoutes = require("./AppTranslationRoutes");
const contactRoutes = require("./ContactRoutes");
const notificationRoutes = require("./NotificationRoutes");

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/permissions", permissionRoutes);
router.use("/customers", customerRoutes);
router.use("/cms", cmsRoutes);
router.use("/site-settings", siteSettingRoutes);
router.use("/faqs", faqRoutes);
router.use("/common", commonRoutes);
router.use("/app-settings", appSettingRoutes);
router.use("/app-translations", appTranslationRoutes);
router.use("/contacts", contactRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;