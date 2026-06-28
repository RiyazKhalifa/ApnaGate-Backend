const BlockService = require("../services/BlockService");

class BlockController {
    static async getAllBlocks(req, res) {
        try {
            const { society_id, page, limit, search, sortBy, sortOrder } = req.query;
            if (!society_id) {
                return res.fail("errors.society_id_required", 400);
            }
            const result = await BlockService.getAllBlocks(society_id, page, limit, search, sortBy, sortOrder);
            return res.success("messages.blocks_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getBlockById(req, res) {
        try {
            const id = req.params.id;
            const block = await BlockService.getBlockById(id);
            return res.success("messages.block_retrieved", block);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createBlock(req, res) {
        try {
            const blockData = req.body;
            const newBlock = await BlockService.createBlock(blockData);
            return res.success("messages.block_created", newBlock, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateBlock(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedBlock = await BlockService.updateBlock(id, updateData);
            return res.success("messages.block_updated", updatedBlock);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteBlock(req, res) {
        try {
            const id = req.params.id;
            const result = await BlockService.deleteBlock(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = BlockController;
