const express = require('express');
const BlockController = require('../../controllers/BlockController');
const BlockValidator = require('../../validators/BlockValidator');
const authMiddleware = require('../../middlewares/AuthMiddleware');
const checkPermission = require('../../middlewares/PermissionMiddleware');
const validateRequest = require('../../middlewares/ValidateRequest');

const router = express.Router();

router.use(authMiddleware);

router.get(
    "/",
    checkPermission("block.list"),
    BlockController.getAllBlocks
);

router.get(
    "/:id",
    checkPermission("block.view"),
    BlockValidator.blockIdValidator,
    validateRequest,
    BlockController.getBlockById
);

router.post(
    "/",
    checkPermission("block.create"),
    BlockValidator.createBlockValidator,
    validateRequest,
    BlockController.createBlock
);

router.put(
    "/:id",
    checkPermission("block.update"),
    BlockValidator.updateBlockValidator,
    validateRequest,
    BlockController.updateBlock
);

router.delete(
    "/:id",
    checkPermission("block.delete"),
    BlockValidator.blockIdValidator,
    validateRequest,
    BlockController.deleteBlock
);

module.exports = router;
