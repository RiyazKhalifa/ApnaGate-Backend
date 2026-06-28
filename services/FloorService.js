const { Floor, Tower, Block, sequelize } = require("../models");
const { Op } = require("sequelize");

class FloorService {
    static async getAllFloors(societyId, blockId = null, towerId = null, page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const towerWhere = {};
            if (towerId) {
                towerWhere.id = towerId;
            }

            const blockWhere = { society_id: societyId };
            if (blockId) {
                blockWhere.id = blockId;
            }

            const whereClause = {};
            if (search) {
                // Since floor_number is integer, we query direct or cast
                whereClause.floor_number = { [Op.like]: `%${search}%` };
            }

            let orderClause = [['created_at', 'DESC']];
            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                if (sortBy === 'tower') {
                    orderClause = [[{ model: Tower, as: 'tower' }, 'name', validSortOrder]];
                } else if (sortBy === 'floor_number') {
                    orderClause = [['floor_number', validSortOrder]];
                } else {
                    orderClause = [[sortBy, validSortOrder]];
                }
            }

            const { count, rows } = await Floor.findAndCountAll({
                where: whereClause,
                include: [{
                    model: Tower,
                    as: 'tower',
                    where: towerWhere,
                    attributes: ['id', 'name', 'block_id'],
                    include: [{
                        model: Block,
                        as: 'block',
                        where: blockWhere,
                        attributes: ['id', 'name']
                    }]
                }],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                floors: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in FloorService.getAllFloors:", error);
            throw error;
        }
    }

    static async getFloorById(floorId, transaction = null) {
        try {
            const floor = await Floor.findByPk(floorId, {
                include: [{
                    model: Tower,
                    as: 'tower',
                    attributes: ['id', 'name', 'block_id'],
                    include: [{
                        model: Block,
                        as: 'block',
                        attributes: ['id', 'name', 'society_id']
                    }]
                }],
                transaction
            });
            if (!floor) throw { status: 404, message: 'errors.floor_not_found' };
            return floor;
        } catch (error) {
            console.error("Error in getFloorById:", error);
            throw error;
        }
    }

    static async createFloor(floorData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { tower_id, floor_number, status = "active" } = floorData;

                const tower = await Tower.findByPk(tower_id, { transaction: t });
                if (!tower) throw { status: 400, message: 'errors.tower_not_found' };

                const existingFloor = await Floor.findOne({
                    where: { tower_id, floor_number },
                    transaction: t
                });
                if (existingFloor) throw { status: 400, message: 'errors.floor_already_exists' };

                const floor = await Floor.create({
                    tower_id,
                    floor_number,
                    status
                }, { transaction: t });

                return floor;
            });
        } catch (error) {
            console.error("Error in createFloor:", error);
            throw error;
        }
    }

    static async updateFloor(floorId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { tower_id, floor_number, status } = updateData;

                const floor = await Floor.findByPk(floorId, { transaction: t });
                if (!floor) throw { status: 404, message: "errors.floor_not_found" };

                const targetTowerId = tower_id || floor.tower_id;
                if (tower_id && tower_id !== floor.tower_id) {
                    const tower = await Tower.findByPk(tower_id, { transaction: t });
                    if (!tower) throw { status: 400, message: "errors.tower_not_found" };
                }

                if (floor_number !== undefined && (floor_number !== floor.floor_number || (tower_id && tower_id !== floor.tower_id))) {
                    const existingFloor = await Floor.findOne({
                        where: { tower_id: targetTowerId, floor_number, id: { [Op.ne]: floorId } },
                        transaction: t
                    });
                    if (existingFloor) throw { status: 400, message: "errors.floor_already_exists" };
                }

                const updateFields = {};
                if (tower_id !== undefined) updateFields.tower_id = tower_id;
                if (floor_number !== undefined) updateFields.floor_number = floor_number;
                if (status !== undefined) updateFields.status = status;

                if (Object.keys(updateFields).length > 0) {
                    await floor.update(updateFields, { transaction: t });
                }

                return await this.getFloorById(floorId, t);
            });
        } catch (error) {
            console.error("Error in updateFloor:", error);
            throw error;
        }
    }

    static async deleteFloor(floorId) {
        const floor = await Floor.findByPk(floorId);
        if (!floor) throw { status: 404, message: "errors.floor_not_found" };

        await floor.destroy();
        return { message: "messages.floor_deleted_successfully" };
    }
}

module.exports = FloorService;
