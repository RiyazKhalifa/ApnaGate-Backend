const { SocietyUser, SocietyRole, sequelize } = require("../models");
const bcrypt = require("../utils/BcryptUtils");
const { Op } = require("sequelize");
const crypto = require('crypto');
const emailService = require('../utils/EmailService');

class SocietyUserService {
    static async getAllSocietyUsers(societyId, page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = {
                society_id: societyId
            };

            if (search) {
                whereClause[Op.or] = [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { phone: { [Op.like]: `%${search}%` } }
                ];
            }

            const includeRole = [{
                model: SocietyRole,
                as: 'role',
                attributes: ['id', 'name', 'name_ar']
            }];

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

                switch (sortBy) {
                    case 'name':
                        orderClause = [['name', validSortOrder]];
                        break;
                    case 'email':
                        orderClause = [['email', validSortOrder]];
                        break;
                    case 'status':
                        orderClause = [['status', validSortOrder]];
                        break;
                    case 'role':
                        orderClause = [[{ model: SocietyRole, as: 'role' }, 'name', validSortOrder]];
                        break;
                    case 'created_at':
                        orderClause = [['created_at', validSortOrder]];
                        break;
                    default:
                        orderClause = [[sortBy, validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await SocietyUser.findAndCountAll({
                where: whereClause,
                attributes: [
                    'id',
                    'society_id',
                    'society_role_id',
                    'name',
                    'email',
                    'phone',
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
            console.error("Error in SocietyUserService.getAllSocietyUsers:", error);
            throw error;
        }
    }

    static async getSocietyUserById(userId, transaction = null) {
        try {
            const user = await SocietyUser.findByPk(userId, {
                attributes: [
                    'id',
                    'society_id',
                    'society_role_id',
                    'name',
                    'email',
                    'phone',
                    'status',
                    'profile_image',
                    'created_at',
                    'updated_at'
                ],
                include: [{
                    model: SocietyRole,
                    as: 'role',
                    attributes: ['id', 'name', 'name_ar']
                }],
                transaction
            });

            if (!user) throw { status: 404, message: 'errors.user_not_found' };
            return user;
        } catch (error) {
            console.error("Error in getSocietyUserById:", error);
            throw error;
        }
    }

    static async createSocietyUser(userData, lang = 'en') {
        try {
            return await sequelize.transaction(async (t) => {
                const { society_id, society_role_id, name, email, phone, status = "active", profile_image = null } = userData;

                const existingUser = await SocietyUser.findOne({ where: { email }, transaction: t });
                if (existingUser) throw { status: 400, message: 'errors.email_already_exists' };

                const role = await SocietyRole.findOne({
                    where: { id: society_role_id, society_id },
                    transaction: t
                });
                if (!role) throw { status: 400, message: 'errors.invalid_role' };

                const plainPassword = crypto.randomBytes(8).toString('hex');
                const hashedPassword = await bcrypt.hashPassword(plainPassword);

                const user = await SocietyUser.create({
                    society_id,
                    society_role_id,
                    name,
                    email,
                    phone,
                    password: hashedPassword,
                    status,
                    profile_image
                }, { transaction: t });

                emailService.sendNewUserCredentialsEmail(email, plainPassword, name, lang).catch((error) => {
                    console.error("Error sending credentials email to society user:", error);
                });

                return await this.getSocietyUserById(user.id, t);
            });
        } catch (error) {
            console.error("Error in createSocietyUser:", error);
            throw error;
        }
    }

    static async updateSocietyUser(userId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { society_role_id, name, email, phone, status, profile_image } = updateData;

                const user = await SocietyUser.findByPk(userId, { transaction: t });
                if (!user) throw { status: 404, message: "errors.user_not_found" };

                if (email && email !== user.email) {
                    const existingUser = await SocietyUser.findOne({
                        where: { email, id: { [Op.ne]: userId } },
                        transaction: t
                    });
                    if (existingUser) throw { status: 400, message: "errors.email_already_exists" };
                }

                if (society_role_id && society_role_id !== user.society_role_id) {
                    const role = await SocietyRole.findOne({
                        where: { id: society_role_id, society_id: user.society_id },
                        transaction: t
                    });
                    if (!role) throw { status: 400, message: "errors.invalid_role" };
                }

                const updateFields = {};
                if (name !== undefined) updateFields.name = name;
                if (email !== undefined) updateFields.email = email;
                if (phone !== undefined) updateFields.phone = phone;
                if (status !== undefined) updateFields.status = status;
                if (profile_image !== undefined) updateFields.profile_image = profile_image;
                if (society_role_id !== undefined) updateFields.society_role_id = society_role_id;

                if (Object.keys(updateFields).length > 0) {
                    await user.update(updateFields, { transaction: t });
                }

                return await this.getSocietyUserById(userId, t);
            });
        } catch (error) {
            console.error("Error in updateSocietyUser:", error);
            throw error;
        }
    }

    static async deleteSocietyUser(userId) {
        const user = await SocietyUser.findByPk(userId);
        if (!user) throw { status: 404, message: "errors.user_not_found" };

        await user.destroy();
        return { message: "messages.user_deleted_successfully" };
    }
}

module.exports = SocietyUserService;
