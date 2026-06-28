const TowerService = require("../services/TowerService");

class TowerController {
    static async getAllTowers(req, res) {
        try {
            const { society_id, block_id, page, limit, search, sortBy, sortOrder } = req.query;
            if (!society_id) {
                return res.fail("errors.society_id_required", 400);
            }
            const result = await TowerService.getAllTowers(society_id, block_id, page, limit, search, sortBy, sortOrder);
            return res.success("messages.towers_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getTowerById(req, res) {
        try {
            const id = req.params.id;
            const tower = await TowerService.getTowerById(id);
            return res.success("messages.tower_retrieved", tower);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createTower(req, res) {
        try {
            const towerData = req.body;
            const newTower = await TowerService.createTower(towerData);
            return res.success("messages.tower_created", newTower, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateTower(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedTower = await TowerService.updateTower(id, updateData);
            return res.success("messages.tower_updated", updatedTower);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteTower(req, res) {
        try {
            const id = req.params.id;
            const result = await TowerService.deleteTower(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = TowerController;
