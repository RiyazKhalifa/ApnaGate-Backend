const express = require('express');
const SocietyController = require('../../controllers/SocietyController');
const SocietyValidator = require('../../validators/SocietyValidator');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');
const { makeUploader } = require('../../utils/UploadUtils');

const router = express.Router();
const societyUpload = makeUploader("societies");

router.use(authMiddleware);

router.get(
    "/",
    checkPermission("society.view"),
    SocietyController.getAllSocieties
);

router.get(
    "/:id",
    checkPermission("society.view"),
    SocietyValidator.societyIdValidator,
    validateRequest,
    SocietyController.getSocietyById
);

router.post(
    "/",
    checkPermission("society.create"),
    societyUpload.single("logo"),
    SocietyValidator.createSocietyValidator,
    validateRequest,
    SocietyController.createSociety
);

router.put(
    "/:id",
    checkPermission("society.update"),
    societyUpload.single("logo"),
    SocietyValidator.updateSocietyValidator,
    validateRequest,
    SocietyController.updateSociety
);

router.delete(
    "/:id",
    checkPermission("society.delete"),
    SocietyValidator.societyIdValidator,
    validateRequest,
    SocietyController.deleteSociety
);

module.exports = router;
