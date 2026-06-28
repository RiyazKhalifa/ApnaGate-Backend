const { Society, User, sequelize } = require("../models");
const { Op } = require("sequelize");

class SocietyService {
    static async getAllSocieties(page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { name_ar: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            } : {};

            let orderClause = [['created_at', 'DESC']];

            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                orderClause = [[sortBy, validSortOrder]];
            }

            const { count, rows } = await Society.findAndCountAll({
                where: whereClause,
                attributes: [
                    'id',
                    'name',
                    'name_ar',
                    'registration_no',
                    'email',
                    'phone',
                    'address',
                    'city',
                    'district',
                    'state',
                    'country',
                    'zipcode',
                    'logo',
                    'status',
                    'created_by',
                    'created_at',
                    'updated_at'
                ],
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'name', 'email']
                }],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                societies: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in SocietyService.getAllSocieties:", error);
            throw error;
        }
    }

    static async getSocietyById(societyId, transaction = null) {
        try {
            const society = await Society.findByPk(societyId, {
                attributes: [
                    'id',
                    'name',
                    'name_ar',
                    'registration_no',
                    'email',
                    'phone',
                    'address',
                    'city',
                    'district',
                    'state',
                    'country',
                    'zipcode',
                    'logo',
                    'status',
                    'created_by',
                    'created_at',
                    'updated_at'
                ],
                include: [{
                    model: User,
                    as: 'creator',
                    attributes: ['id', 'name', 'email']
                }],
                transaction
            });

            if (!society) throw { status: 404, message: 'errors.society_not_found' };
            return society;
        } catch (error) {
            console.error("Error in getSocietyById:", error);
            throw error;
        }
    }

    static async createSociety(societyData) {
        try {
            return await sequelize.transaction(async (t) => {
                const society = await Society.create(societyData, { transaction: t });
                return await this.getSocietyById(society.id, t);
            });
        } catch (error) {
            console.error("Error in createSociety:", error);
            throw error;
        }
    }

    static async updateSociety(societyId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const society = await Society.findByPk(societyId, { transaction: t });
                if (!society) throw { status: 404, message: "errors.society_not_found" };

                await society.update(updateData, { transaction: t });
                return await this.getSocietyById(societyId, t);
            });
        } catch (error) {
            console.error("Error in updateSociety:", error);
            throw error;
        }
    }

    static async deleteSociety(societyId) {
        const society = await Society.findByPk(societyId);
        if (!society) throw { status: 404, message: "errors.society_not_found" };

        await society.destroy();
        return { message: "messages.society_deleted" };
    }
}

module.exports = SocietyService;
