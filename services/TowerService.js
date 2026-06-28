const { Tower, Block, sequelize } = require("../models");
const { Op } = require("sequelize");

class TowerService {
    static async getAllTowers(societyId, blockId = null, page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const blockWhere = { society_id: societyId };
            if (blockId) {
                blockWhere.id = blockId;
            }

            const whereClause = {};
            if (search) {
                whereClause.name = { [Op.like]: `%${search}%` };
            }

            let orderClause = [['created_at', 'DESC']];
            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                if (sortBy === 'block') {
                    orderClause = [[{ model: Block, as: 'block' }, 'name', validSortOrder]];
                } else {
                    orderClause = [[sortBy, validSortOrder]];
                }
            }

            const { count, rows } = await Tower.findAndCountAll({
                where: whereClause,
                include: [{
                    model: Block,
                    as: 'block',
                    where: blockWhere,
                    attributes: ['id', 'name']
                }],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                towers: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in TowerService.getAllTowers:", error);
            throw error;
        }
    }

    static async getTowerById(towerId, transaction = null) {
        try {
            const tower = await Tower.findByPk(towerId, {
                include: [{
                    model: Block,
                    as: 'block',
                    attributes: ['id', 'name', 'society_id']
                }],
                transaction
            });
            if (!tower) throw { status: 404, message: 'errors.tower_not_found' };
            return tower;
        } catch (error) {
            console.error("Error in getTowerById:", error);
            throw error;
        }
    }

    static async createTower(towerData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { block_id, name, floors_count, status = "active" } = towerData;

                const block = await Block.findByPk(block_id, { transaction: t });
                if (!block) throw { status: 400, message: 'errors.block_not_found' };

                const existingTower = await Tower.findOne({
                    where: { block_id, name },
                    transaction: t
                });
                if (existingTower) throw { status: 400, message: 'errors.tower_name_already_exists' };

                const tower = await Tower.create({
                    block_id,
                    name,
                    floors_count,
                    status
                }, { transaction: t });

                return tower;
            });
        } catch (error) {
            console.error("Error in createTower:", error);
            throw error;
        }
    }

    static async updateTower(towerId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { block_id, name, floors_count, status } = updateData;

                const tower = await Tower.findByPk(towerId, { transaction: t });
                if (!tower) throw { status: 404, message: "errors.tower_not_found" };

                const targetBlockId = block_id || tower.block_id;
                if (block_id && block_id !== tower.block_id) {
                    const block = await Block.findByPk(block_id, { transaction: t });
                    if (!block) throw { status: 400, message: "errors.block_not_found" };
                }

                if (name && (name !== tower.name || (block_id && block_id !== tower.block_id))) {
                    const existingTower = await Tower.findOne({
                        where: { block_id: targetBlockId, name, id: { [Op.ne]: towerId } },
                        transaction: t
                    });
                    if (existingTower) throw { status: 400, message: "errors.tower_name_already_exists" };
                }

                const updateFields = {};
                if (block_id !== undefined) updateFields.block_id = block_id;
                if (name !== undefined) updateFields.name = name;
                if (floors_count !== undefined) updateFields.floors_count = floors_count;
                if (status !== undefined) updateFields.status = status;

                if (Object.keys(updateFields).length > 0) {
                    await tower.update(updateFields, { transaction: t });
                }

                return await this.getTowerById(towerId, t);
            });
        } catch (error) {
            console.error("Error in updateTower:", error);
            throw error;
        }
    }

    static async deleteTower(towerId) {
        const tower = await Tower.findByPk(towerId);
        if (!tower) throw { status: 404, message: "errors.tower_not_found" };

        await tower.destroy();
        return { message: "messages.tower_deleted_successfully" };
    }
}

module.exports = TowerService;
