const express = require("express");
const FlatController = require("../controllers/FlatController");
const FlatValidator = require("../validators/FlatValidator");
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");
const validateRequest = require("../middlewares/ValidateRequest");

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/",
    checkPermission("flat.list"),
    FlatController.getAllFlats
);

router.get(
    "/:id",
    checkPermission("flat.view"),
    FlatValidator.flatIdValidator,
    validateRequest,
    FlatController.getFlatById
);

router.post(
    "/",
    checkPermission("flat.create"),
    FlatValidator.createFlatValidator,
    validateRequest,
    FlatController.createFlat
);

router.put(
    "/:id",
    checkPermission("flat.update"),
    FlatValidator.updateFlatValidator,
    validateRequest,
    FlatController.updateFlat
);

router.delete(
    "/:id",
    checkPermission("flat.delete"),
    FlatValidator.flatIdValidator,
    validateRequest,
    FlatController.deleteFlat
);

module.exports = router;
