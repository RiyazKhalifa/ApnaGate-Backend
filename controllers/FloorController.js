const FloorService = require("../services/FloorService");

class FloorController {
    static async getAllFloors(req, res) {
        try {
            const { society_id, block_id, tower_id, page, limit, search, sortBy, sortOrder } = req.query;
            if (!society_id) {
                return res.fail("errors.society_id_required", 400);
            }
            const result = await FloorService.getAllFloors(society_id, block_id, tower_id, page, limit, search, sortBy, sortOrder);
            return res.success("messages.floors_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getFloorById(req, res) {
        try {
            const id = req.params.id;
            const floor = await FloorService.getFloorById(id);
            return res.success("messages.floor_retrieved", floor);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createFloor(req, res) {
        try {
            const floorData = req.body;
            const newFloor = await FloorService.createFloor(floorData);
            return res.success("messages.floor_created", newFloor, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateFloor(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedFloor = await FloorService.updateFloor(id, updateData);
            return res.success("messages.floor_updated", updatedFloor);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteFloor(req, res) {
        try {
            const id = req.params.id;
            const result = await FloorService.deleteFloor(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = FloorController;
