const CmsService = require("../services/CmsService");

class CmsController {
    static async getAllCms(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;

            const cms = await CmsService.getAllCms(page, limit, search, sortBy, sortOrder);
            return res.success("messages.cms_list_retrieved", cms);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getCmsById(req, res) {
        try {
            const id = req.params.id;
            const cms = await CmsService.getCmsById(id);
            return res.success("messages.cms_retrieved", cms);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateCms(req, res) {
        try {
            const id = req.params.id;
            const reqBody = req.body;
            const updatedCms = await CmsService.updateCms(id, reqBody);
            return res.success("messages.cms_updated", updatedCms);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = CmsController;