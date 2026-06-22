const { Role, Permission, Sequelize, sequelize } = require("../models");
const { Op } = Sequelize;

class RolePermissionService {
    static async createRole(data) {
        const { name, name_ar, status = 'active', permissionIds = [] } = data;

        const existingRole = await Role.findOne({ where: { [Op.or]: [{ name }, { name_ar }] } });
        if (existingRole) throw { status: 400, message: "errors.role_already_exists" };

        return await sequelize.transaction(async (t) => {
            const role = await Role.create({ name, name_ar, status }, { transaction: t });

            if (permissionIds.length) {
                const permissions = await Permission.findAll({ where: { id: permissionIds }, transaction: t });
                if (permissions.length !== permissionIds.length) {
                    throw { status: 400, message: "errors.invalid_permissions" };
                }
                await role.setPermissions(permissions, { transaction: t });
            }

            return await role.reload({
                attributes: ["id", "name", "name_ar", "status"],
                include: [{
                    model: Permission,
                    as: 'permissions',
                    attributes: ["id", "name", "name_ar"],
                    through: { attributes: [] }
                }],
                transaction: t
            });
        });
    }

    static async getAllRoles(page = 1, limit = 10, search = '', includePermissions = false, sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { name_ar: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            const include = includePermissions ? [{
                model: Permission,
                as: 'permissions',
                attributes: ["id", "name", "name_ar"],
                through: { attributes: [] }
            }] : [];

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

                switch (sortBy) {
                    case 'name':
                        orderClause = [['name', validSortOrder]];
                        break;
                    case 'name_ar':
                        orderClause = [['name_ar', validSortOrder]];
                        break;
                    case 'status':
                        orderClause = [['status', validSortOrder]];
                        break;
                    case 'id':
                        orderClause = [['id', validSortOrder]];
                        break;
                    case 'created_at':
                        orderClause = [['created_at', validSortOrder]];
                        break;
                    default:
                        orderClause = [[sortBy, validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await Role.findAndCountAll({
                where: whereClause,
                attributes: ['id', 'name', 'name_ar', 'status', 'created_at', 'updated_at'],
                include,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                roles: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in RoleService.getAllRoles:", error);
            throw error;
        }
    }

    static async getRoleById(roleId) {
        const role = await Role.findByPk(roleId, {
            attributes: ["id", "name", "name_ar", "status"],
            include: [{
                model: Permission,
                as: 'permissions',
                attributes: ["id", "name", "name_ar"],
                through: { attributes: [] }
            }]
        });
        if (!role) throw { status: 404, message: "errors.role_not_found" };
        return role;
    }

    static async updateRole(roleId, data) {
        const { name, name_ar, status, permissionIds } = data;

        const role = await Role.findByPk(roleId);
        if (!role) throw { status: 404, message: "errors.role_not_found" };

        return await sequelize.transaction(async (t) => {
            if (name) role.name = name;
            if (name_ar) role.name_ar = name_ar;
            if (status) role.status = status;
            await role.save({ transaction: t });

            if (permissionIds !== undefined) {
                const permissions = await Permission.findAll({ where: { id: permissionIds }, transaction: t });

                if (permissionIds.length > 0 && permissions.length !== permissionIds.length) {
                    throw { status: 400, message: "errors.invalid_permissions" };
                }

                await role.setPermissions(permissions, { transaction: t });
            }

            return await role.reload({
                attributes: ["id", "name", "name_ar", "status"],
                include: [{
                    model: Permission,
                    as: 'permissions',
                    attributes: ["id", "name", "name_ar"],
                    through: { attributes: [] }
                }],
                transaction: t
            });
        });
    }

    static async deleteRole(roleId) {
        const role = await Role.findByPk(roleId);
        if (!role) throw { status: 404, message: "errors.role_not_found" };

        await role.destroy();
        return { message: "messages.role_deleted_successfully" };
    }

    static async createPermission(data) {
        const { name, name_ar } = data;
        const existing = await Permission.findOne({ where: { [Op.or]: [{ name }, { name_ar }] } });
        if (existing) throw { status: 400, message: "errors.permission_already_exists" };

        const permission = await Permission.create({ name, name_ar });
        return await Permission.findByPk(permission.id, { attributes: ["id", "name", "name_ar"] });
    }

    static async getAllPermissions() {
        return await Permission.findAll({
            attributes: ["id", "name", "name_ar"],
            order: [['created_at', 'DESC']]
        });
    }

    static async getPermissionById(permissionId) {
        const permission = await Permission.findByPk(permissionId, { attributes: ["id", "name", "name_ar"] });
        if (!permission) throw { status: 404, message: "errors.permission_not_found" };
        return permission;
    }

    static async updatePermission(permissionId, data) {
        const permission = await Permission.findByPk(permissionId);
        if (!permission) throw { status: 404, message: "errors.permission_not_found" };

        if (data.name) permission.name = data.name;
        if (data.name_ar) permission.name_ar = data.name_ar;
        await permission.save();
        return await Permission.findByPk(permissionId, { attributes: ["id", "name", "name_ar"] });
    }
}

module.exports = RolePermissionService;