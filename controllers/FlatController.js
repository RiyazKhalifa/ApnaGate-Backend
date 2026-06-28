const FlatService = require("../services/FlatService");

class FlatController {
    static async getAllFlats(req, res) {
        try {
            const { society_id, block_id, tower_id, floor_id, page, limit, search, sortBy, sortOrder } = req.query;
            if (!society_id) {
                return res.fail("errors.society_id_required", 400);
            }
            const result = await FlatService.getAllFlats(society_id, block_id, tower_id, floor_id, page, limit, search, sortBy, sortOrder);
            return res.success("messages.flats_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getFlatById(req, res) {
        try {
            const id = req.params.id;
            const flat = await FlatService.getFlatById(id);
            return res.success("messages.flat_retrieved", flat);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createFlat(req, res) {
        try {
            const flatData = req.body;
            const newFlat = await FlatService.createFlat(flatData);
            return res.success("messages.flat_created", newFlat, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateFlat(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const updatedFlat = await FlatService.updateFlat(id, updateData);
            return res.success("messages.flat_updated", updatedFlat);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteFlat(req, res) {
        try {
            const id = req.params.id;
            const result = await FlatService.deleteFlat(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = FlatController;
