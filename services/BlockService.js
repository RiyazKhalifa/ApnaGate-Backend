const { Block, Society, sequelize } = require("../models");
const { Op } = require("sequelize");

class BlockService {
    static async getAllBlocks(societyId, page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;
            const whereClause = { society_id: societyId };

            if (search) {
                whereClause.name = { [Op.like]: `%${search}%` };
            }

            let orderClause = [['created_at', 'DESC']];
            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                orderClause = [[sortBy, validSortOrder]];
            }

            const { count, rows } = await Block.findAndCountAll({
                where: whereClause,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                blocks: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in BlockService.getAllBlocks:", error);
            throw error;
        }
    }

    static async getBlockById(blockId, transaction = null) {
        try {
            const block = await Block.findByPk(blockId, { transaction });
            if (!block) throw { status: 404, message: 'errors.block_not_found' };
            return block;
        } catch (error) {
            console.error("Error in getBlockById:", error);
            throw error;
        }
    }

    static async createBlock(blockData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { society_id, name, description, status = "active" } = blockData;

                const existingBlock = await Block.findOne({
                    where: { society_id, name },
                    transaction: t
                });
                if (existingBlock) throw { status: 400, message: 'errors.block_name_already_exists' };

                const block = await Block.create({
                    society_id,
                    name,
                    description,
                    status
                }, { transaction: t });

                return block;
            });
        } catch (error) {
            console.error("Error in createBlock:", error);
            throw error;
        }
    }

    static async updateBlock(blockId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { name, description, status } = updateData;

                const block = await Block.findByPk(blockId, { transaction: t });
                if (!block) throw { status: 404, message: "errors.block_not_found" };

                if (name && name !== block.name) {
                    const existingBlock = await Block.findOne({
                        where: { society_id: block.society_id, name, id: { [Op.ne]: blockId } },
                        transaction: t
                    });
                    if (existingBlock) throw { status: 400, message: "errors.block_name_already_exists" };
                }

                const updateFields = {};
                if (name !== undefined) updateFields.name = name;
                if (description !== undefined) updateFields.description = description;
                if (status !== undefined) updateFields.status = status;

                if (Object.keys(updateFields).length > 0) {
                    await block.update(updateFields, { transaction: t });
                }

                return block;
            });
        } catch (error) {
            console.error("Error in updateBlock:", error);
            throw error;
        }
    }

    static async deleteBlock(blockId) {
        const block = await Block.findByPk(blockId);
        if (!block) throw { status: 404, message: "errors.block_not_found" };

        await block.destroy();
        return { message: "messages.block_deleted_successfully" };
    }
}

module.exports = BlockService;
