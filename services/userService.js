const { User, Role, Permission, sequelize } = require("../models");
const bcrypt = require("../utils/BcryptUtils");
const { Op, where } = require("sequelize");
const crypto = require('crypto');
const emailService = require('../utils/EmailService');

class UserService {
    static async getAllUsers(page = 1, limit = 10, search = '', includePermissions = false, sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            const includeRole = [{
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
                include: includePermissions ? [{
                    model: Permission,
                    as: 'permissions',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }] : []
            }];

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

                switch (sortBy) {
                    case 'fullName':
                        orderClause = [['name', validSortOrder]];
                        break;
                    case 'role':
                        orderClause = [[{ model: Role, as: 'role' }, 'name', validSortOrder]];
                        break;
                    default:
                        orderClause = [[sortBy, validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await User.findAndCountAll({
                where: {
                    ...whereClause,
                    id: { [Op.ne]: 1 } // Exclude super admin
                },
                attributes: [
                    'id',
                    'name',
                    'email',
                    'status',
                    'profile_image',
                    'created_at',
                    'updated_at'
                ],
                include: includeRole,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                users: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in UserService.getAllUsers:", error);
            throw error;
        }
    }

    static async getUserById(userId, transaction = null) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['id', 'name', 'email', 'status', 'profile_image', 'created_at', 'updated_at'],
                include: [{
                    model: Role,
                    as: 'role',
                    attributes: ['id', 'name'],
                    include: [{
                        model: Permission,
                        as: 'permissions',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }]
                }],
                transaction
            });

            if (!user) throw { status: 404, message: 'errors.user_not_found' };
            return user;
        } catch (error) {
            console.error("Error in getUserById:", error);
            throw error;
        }
    }

    static async createUser(userData, lang = 'en') {
        try {
            return await sequelize.transaction(async (t) => {
                const { name, email, status = "active", profile_image = null, roleId } = userData;

                const existingUser = await User.findOne({ where: { email }, transaction: t });
                if (existingUser) throw { status: 400, message: 'errors.email_already_exists' };

                let role = null;
                if (roleId) {
                    role = await Role.findByPk(roleId, { transaction: t });
                    if (!role) throw { status: 400, message: 'errors.invalid_role' };
                }

                const plainPassword = crypto.randomBytes(8).toString('hex');
                const hashedPassword = await bcrypt.hashPassword(plainPassword);

                const user = await User.create({
                    name,
                    email,
                    password: hashedPassword,
                    status,
                    profile_image,
                    roleId: role ? role.id : null
                }, { transaction: t });

                if (role) await user.setRole(role, { transaction: t });

                emailService.sendNewUserCredentialsEmail(email, plainPassword, name, lang).catch((error) => {
                    console.error("Error in sending email:", error);
                });

                return await this.getUserById(user.id, t);
            });
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error;
        }
    }

    static async updateUser(userId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { name, email, roleId, status, profile_image } = updateData;

                const user = await User.findByPk(userId, { transaction: t });
                if (!user) throw { status: 404, message: "errors.user_not_found" };

                if (email && email !== user.email) {
                    const existingUser = await User.findOne({
                        where: { email, id: { [Op.ne]: userId } },
                        transaction: t
                    });
                    if (existingUser) throw { status: 400, message: "errors.email_already_exists" };
                }

                const updateFields = {};
                if (name !== undefined) updateFields.name = name;
                if (email !== undefined) updateFields.email = email;
                if (status !== undefined) updateFields.status = status;
                if (profile_image !== undefined) updateFields.profile_image = profile_image;

                if (Object.keys(updateFields).length > 0) {
                    await user.update(updateFields, { transaction: t });
                }

                if (roleId !== undefined) {
                    if (roleId === null) {
                        await user.setRole(null, { transaction: t });
                    } else {
                        const role = await Role.findByPk(roleId, { transaction: t });
                        if (!role) throw { status: 400, message: "errors.invalid_role" };
                        await user.setRole(role, { transaction: t });
                    }
                }

                return await this.getUserById(userId, t);
            });
        } catch (error) {
            console.error("Error in updateUser:", error);
            throw error;
        }
    }

    static async deleteUser(userId) {
        const user = await User.findByPk(userId);
        if (!user) throw { status: 404, message: "errors.user_not_found" };

        // Prevent deleting super admin if needed, though Op.ne 1 check in getAll might hide it anyway
        if (user.id === 1) throw { status: 403, message: "errors.cannot_delete_super_admin" };

        await user.destroy();
        return { message: "messages.user_deleted_successfully" };
    }
}

module.exports = UserService;