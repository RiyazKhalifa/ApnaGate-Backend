const CommonService = require('../services/CommonService');

class CommonController {
    static async updateStatus(req, res) {
        try {
            const { module, id, status } = req.body;

            const result = await CommonService.updateStatus(module, id, status);

            return res.success("messages.status_updated", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async delete(req, res) {
        try {
            const { module, id } = req.body;

            const result = await CommonService.deleteEntity(module, id);
            return res.success("messages.deleted", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async adjustSequence(req, res) {
        try {
            const { module, sequences } = req.body;
            const result = await CommonService.adjustSequences(module, sequences);
            return res.success("messages.sequence_updated", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = CommonController;