const { SocietyRole, SocietyRolePermission, Sequelize, sequelize } = require("../models");
const { Op } = Sequelize;
const SOCIETY_PERMISSIONS = require('../config/societyPermissions');

class SocietyRoleService {
    static async createSocietyRole(data) {
        const { society_id, name, name_ar, description, status = 'active', permissionKeys = [] } = data;

        const existingRole = await SocietyRole.findOne({
            where: {
                society_id,
                [Op.or]: [{ name }, { name_ar }]
            }
        });
        if (existingRole) throw { status: 400, message: "errors.society_role_already_exists" };

        // Validate permissions against config
        const validKeys = new Set(SOCIETY_PERMISSIONS.map(p => p.name));
        const allValid = permissionKeys.every(k => validKeys.has(k));
        if (!allValid) throw { status: 400, message: "errors.invalid_permissions" };

        return await sequelize.transaction(async (t) => {
            const role = await SocietyRole.create({ society_id, name, name_ar, description, status }, { transaction: t });

            if (permissionKeys.length) {
                const permRecords = permissionKeys.map(key => ({
                    society_role_id: role.id,
                    permission_key: key
                }));
                await SocietyRolePermission.bulkCreate(permRecords, { transaction: t });
            }

            return await role.reload({
                attributes: ["id", "society_id", "name", "name_ar", "description", "status"],
                include: [{
                    model: SocietyRolePermission,
                    as: 'permissions',
                    attributes: ["permission_key"]
                }],
                transaction: t
            });
        });
    }

    static async getAllSocietyRoles(societyId, page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = {
                society_id: societyId
            };

            if (search) {
                whereClause[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { name_ar: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } }
                ];
            }

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

            const { count, rows } = await SocietyRole.findAndCountAll({
                where: whereClause,
                attributes: ['id', 'society_id', 'name', 'name_ar', 'description', 'status', 'created_at', 'updated_at'],
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
            console.error("Error in SocietyRoleService.getAllSocietyRoles:", error);
            throw error;
        }
    }

    static async getSocietyRoleById(roleId) {
        const role = await SocietyRole.findByPk(roleId, {
            attributes: ["id", "society_id", "name", "name_ar", "description", "status"],
            include: [{
                model: SocietyRolePermission,
                as: 'permissions',
                attributes: ["permission_key"]
            }]
        });
        if (!role) throw { status: 404, message: "errors.society_role_not_found" };
        return role;
    }

    static async updateSocietyRole(roleId, data) {
        const { name, name_ar, description, status, permissionKeys } = data;

        const role = await SocietyRole.findByPk(roleId);
        if (!role) throw { status: 404, message: "errors.society_role_not_found" };

        if (name || name_ar) {
            const checkName = name || role.name;
            const checkNameAr = name_ar || role.name_ar;
            const existingRole = await SocietyRole.findOne({
                where: {
                    society_id: role.society_id,
                    id: { [Op.ne]: roleId },
                    [Op.or]: [{ name: checkName }, { name_ar: checkNameAr }]
                }
            });
            if (existingRole) throw { status: 400, message: "errors.society_role_already_exists" };
        }

        if (permissionKeys) {
            const validKeys = new Set(SOCIETY_PERMISSIONS.map(p => p.name));
            const allValid = permissionKeys.every(k => validKeys.has(k));
            if (!allValid) throw { status: 400, message: "errors.invalid_permissions" };
        }

        return await sequelize.transaction(async (t) => {
            if (name) role.name = name;
            if (name_ar) role.name_ar = name_ar;
            if (description !== undefined) role.description = description;
            if (status) role.status = status;
            await role.save({ transaction: t });

            if (permissionKeys !== undefined) {
                await SocietyRolePermission.destroy({
                    where: { society_role_id: roleId },
                    transaction: t
                });

                if (permissionKeys.length) {
                    const permRecords = permissionKeys.map(key => ({
                        society_role_id: roleId,
                        permission_key: key
                    }));
                    await SocietyRolePermission.bulkCreate(permRecords, { transaction: t });
                }
            }

            return await role.reload({
                attributes: ["id", "society_id", "name", "name_ar", "description", "status"],
                include: [{
                    model: SocietyRolePermission,
                    as: 'permissions',
                    attributes: ["permission_key"]
                }],
                transaction: t
            });
        });
    }

    static async deleteSocietyRole(roleId) {
        const role = await SocietyRole.findByPk(roleId);
        if (!role) throw { status: 404, message: "errors.society_role_not_found" };

        await role.destroy();
        return { message: "messages.society_role_deleted" };
    }

    static async getAvailablePermissions() {
        return SOCIETY_PERMISSIONS;
    }
}

module.exports = SocietyRoleService;
