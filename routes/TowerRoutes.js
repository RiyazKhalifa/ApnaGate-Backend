const express = require("express");
const TowerController = require("../controllers/TowerController");
const TowerValidator = require("../validators/TowerValidator");
const authMiddleware = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/PermissionMiddleware");
const validateRequest = require("../middlewares/ValidateRequest");

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/",
    checkPermission("tower.list"),
    TowerController.getAllTowers
);

router.get(
    "/:id",
    checkPermission("tower.view"),
    TowerValidator.towerIdValidator,
    validateRequest,
    TowerController.getTowerById
);

router.post(
    "/",
    checkPermission("tower.create"),
    TowerValidator.createTowerValidator,
    validateRequest,
    TowerController.createTower
);

router.put(
    "/:id",
    checkPermission("tower.update"),
    TowerValidator.updateTowerValidator,
    validateRequest,
    TowerController.updateTower
);

router.delete(
    "/:id",
    checkPermission("tower.delete"),
    TowerValidator.towerIdValidator,
    validateRequest,
    TowerController.deleteTower
);

module.exports = router;
