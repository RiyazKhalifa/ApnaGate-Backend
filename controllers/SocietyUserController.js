const SocietyUserService = require("../services/SocietyUserService");
const { removeFile } = require("../utils/UploadUtils");

class SocietyUserController {
    static async getAllSocietyUsers(req, res) {
        try {
            const { society_id, page, limit, search, sortBy, sortOrder } = req.query;
            if (!society_id) {
                return res.fail("errors.society_id_required", 400);
            }
            const result = await SocietyUserService.getAllSocietyUsers(society_id, page, limit, search, sortBy, sortOrder);
            return res.success("messages.users_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getSocietyUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await SocietyUserService.getSocietyUserById(id);
            return res.success("messages.user_retrieved", user);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createSocietyUser(req, res) {
        try {
            const lang = req.headers["accept-language"] || "en";
            const userData = req.body;
            if (req.file) {
                userData.profile_image = `/uploads/society_users/${req.file.filename}`;
            }

            const newUser = await SocietyUserService.createSocietyUser(userData, lang);
            return res.success("messages.user_created", newUser, 201);
        } catch (error) {
            removeFile(req.file);
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateSocietyUser(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;

            if (req.file) {
                const existingUser = await SocietyUserService.getSocietyUserById(id);
                if (existingUser?.profile_image) {
                    removeFile({ path: `.${existingUser.profile_image}` });
                }
                updateData.profile_image = `/uploads/society_users/${req.file.filename}`;
            }

            const updatedUser = await SocietyUserService.updateSocietyUser(id, updateData);
            return res.success("messages.user_updated", updatedUser);
        } catch (error) {
            removeFile(req.file);
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteSocietyUser(req, res) {
        try {
            const id = req.params.id;
            const result = await SocietyUserService.deleteSocietyUser(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = SocietyUserController;
