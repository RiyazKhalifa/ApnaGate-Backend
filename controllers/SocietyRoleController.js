const SocietyRoleService = require("../services/SocietyRoleService");

class SocietyRoleController {
    static async createSocietyRole(req, res) {
        try {
            const reqBody = req.body;
            const role = await SocietyRoleService.createSocietyRole(reqBody);
            return res.success("messages.society_role_created", role, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async getAllSocietyRoles(req, res) {
        try {
            const { society_id, page, limit, search, sortBy, sortOrder } = req.query;
            if (!society_id) {
                return res.fail("errors.society_id_required", 400);
            }
            const roles = await SocietyRoleService.getAllSocietyRoles(society_id, page, limit, search, sortBy, sortOrder);
            return res.success("messages.society_roles_retrieved", roles);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getSocietyRoleById(req, res) {
        try {
            const id = req.params.id;
            const role = await SocietyRoleService.getSocietyRoleById(id);
            return res.success("messages.society_role_retrieved", role);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateSocietyRole(req, res) {
        try {
            const id = req.params.id;
            const reqBody = req.body;
            const updatedRole = await SocietyRoleService.updateSocietyRole(id, reqBody);
            return res.success("messages.society_role_updated", updatedRole);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteSocietyRole(req, res) {
        try {
            const id = req.params.id;
            const result = await SocietyRoleService.deleteSocietyRole(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async getAvailablePermissions(req, res) {
        try {
            const permissions = await SocietyRoleService.getAvailablePermissions();
            return res.success("messages.permissions_retrieved", permissions);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }
}

module.exports = SocietyRoleController;
