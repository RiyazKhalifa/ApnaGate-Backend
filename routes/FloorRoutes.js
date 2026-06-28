const express = require("express");
const FloorController = require("../controllers/FloorController");
const FloorValidator = require("../validators/FloorValidator");
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");
const validateRequest = require("../middlewares/ValidateRequest");

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/",
    checkPermission("floor.list"),
    FloorController.getAllFloors
);

router.get(
    "/:id",
    checkPermission("floor.view"),
    FloorValidator.floorIdValidator,
    validateRequest,
    FloorController.getFloorById
);

router.post(
    "/",
    checkPermission("floor.create"),
    FloorValidator.createFloorValidator,
    validateRequest,
    FloorController.createFloor
);

router.put(
    "/:id",
    checkPermission("floor.update"),
    FloorValidator.updateFloorValidator,
    validateRequest,
    FloorController.updateFloor
);

router.delete(
    "/:id",
    checkPermission("floor.delete"),
    FloorValidator.floorIdValidator,
    validateRequest,
    FloorController.deleteFloor
);

module.exports = router;
