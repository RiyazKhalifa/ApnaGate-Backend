const RolePermissionService = require("../services/RolePermissionService");

class RolePermissionController {
    static async createRole(req, res) {
        try {
            const reqBody = req.body;
            const role = await RolePermissionService.createRole(reqBody);
            return res.success("messages.role_created", role, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async getAllRoles(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;
            const includePermissions = req.query.includePermissions === 'true';

            const roles = await RolePermissionService.getAllRoles(page, limit, search, includePermissions, sortBy, sortOrder);
            return res.success("messages.roles_retrieved", roles);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getRoleById(req, res) {
        try {
            const id = req.params.id;
            const role = await RolePermissionService.getRoleById(id);
            return res.success("messages.role_retrieved", role);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateRole(req, res) {
        try {
            const id = req.params.id;
            const reqBody = req.body;
            const updatedRole = await RolePermissionService.updateRole(id, reqBody);
            return res.success("messages.role_updated", updatedRole);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteRole(req, res) {
        try {
            const id = req.params.id;
            const result = await RolePermissionService.deleteRole(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createPermission(req, res) {
        try {
            const reqBody = req.body;
            const permission = await RolePermissionService.createPermission(reqBody);
            return res.success("messages.permission_created", permission, 201);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async getAllPermissions(req, res) {
        try {
            const permissions = await RolePermissionService.getAllPermissions();
            return res.success("messages.permissions_retrieved", permissions);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getPermissionById(req, res) {
        try {
            const id = req.params.id;
            const permission = await RolePermissionService.getPermissionById(id);
            return res.success("messages.permission_retrieved", permission);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updatePermission(req, res) {
        try {
            const id = req.params.id;
            const reqBody = req.body;
            const updatedPermission = await RolePermissionService.updatePermission(id, reqBody);
            return res.success("messages.permission_updated", updatedPermission);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = RolePermissionController;