const SocietyService = require("../services/SocietyService");
const { removeFile } = require("../utils/UploadUtils");

class SocietyController {
    static async getAllSocieties(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;
            const result = await SocietyService.getAllSocieties(page, limit, search, sortBy, sortOrder);
            return res.success("messages.societies_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getSocietyById(req, res) {
        try {
            const id = req.params.id;
            const society = await SocietyService.getSocietyById(id);
            return res.success("messages.society_retrieved", society);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createSociety(req, res) {
        try {
            const societyData = req.body;
            if (req.file) {
                societyData.logo = `/uploads/societies/${req.file.filename}`;
            }
            if (req.user) {
                societyData.created_by = req.user.id;
            }

            const newSociety = await SocietyService.createSociety(societyData);
            return res.success("messages.society_created", newSociety, 201);
        } catch (error) {
            if (req.file) removeFile(req.file);
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateSociety(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;

            if (req.file) {
                const existingSociety = await SocietyService.getSocietyById(id);
                if (existingSociety?.logo) {
                    removeFile({ path: `.${existingSociety.logo}` });
                }
                updateData.logo = `/uploads/societies/${req.file.filename}`;
            }

            const updatedSociety = await SocietyService.updateSociety(id, updateData);
            return res.success("messages.society_updated", updatedSociety);
        } catch (error) {
            if (req.file) removeFile(req.file);
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteSociety(req, res) {
        try {
            const id = req.params.id;
            const result = await SocietyService.deleteSociety(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = SocietyController;
