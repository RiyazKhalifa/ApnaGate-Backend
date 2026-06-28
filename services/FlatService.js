const { Flat, Floor, Tower, Block, sequelize } = require("../models");
const { Op } = require("sequelize");

class FlatService {
    static async getAllFlats(societyId, blockId = null, towerId = null, floorId = null, page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = { society_id: societyId };
            if (blockId) whereClause.block_id = blockId;
            if (towerId) whereClause.tower_id = towerId;
            if (floorId) whereClause.floor_id = floorId;

            if (search) {
                whereClause.flat_number = { [Op.like]: `%${search}%` };
            }

            let orderClause = [['created_at', 'DESC']];
            if (sortBy) {
                const validSortOrder = sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                if (sortBy === 'block') {
                    orderClause = [[{ model: Block, as: 'block' }, 'name', validSortOrder]];
                } else if (sortBy === 'tower') {
                    orderClause = [[{ model: Tower, as: 'tower' }, 'name', validSortOrder]];
                } else if (sortBy === 'floor') {
                    orderClause = [[{ model: Floor, as: 'floor' }, 'floor_number', validSortOrder]];
                } else {
                    orderClause = [[sortBy, validSortOrder]];
                }
            }

            const { count, rows } = await Flat.findAndCountAll({
                where: whereClause,
                include: [
                    { model: Block, as: 'block', attributes: ['id', 'name'] },
                    { model: Tower, as: 'tower', attributes: ['id', 'name'] },
                    { model: Floor, as: 'floor', attributes: ['id', 'floor_number'] }
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                flats: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in FlatService.getAllFlats:", error);
            throw error;
        }
    }

    static async getFlatById(flatId, transaction = null) {
        try {
            const flat = await Flat.findByPk(flatId, {
                include: [
                    { model: Block, as: 'block', attributes: ['id', 'name'] },
                    { model: Tower, as: 'tower', attributes: ['id', 'name'] },
                    { model: Floor, as: 'floor', attributes: ['id', 'floor_number'] }
                ],
                transaction
            });
            if (!flat) throw { status: 404, message: 'errors.flat_not_found' };
            return flat;
        } catch (error) {
            console.error("Error in getFlatById:", error);
            throw error;
        }
    }

    static async createFlat(flatData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { society_id, block_id, tower_id, floor_id, flat_number, type, area, parking_slots, status = "vacant" } = flatData;

                const floor = await Floor.findOne({
                    where: { id: floor_id, tower_id },
                    transaction: t
                });
                if (!floor) throw { status: 400, message: 'errors.floor_not_found' };

                const existingFlat = await Flat.findOne({
                    where: { floor_id, flat_number },
                    transaction: t
                });
                if (existingFlat) throw { status: 400, message: 'errors.flat_already_exists' };

                const flat = await Flat.create({
                    society_id,
                    block_id,
                    tower_id,
                    floor_id,
                    flat_number,
                    type,
                    area,
                    parking_slots,
                    status
                }, { transaction: t });

                return flat;
            });
        } catch (error) {
            console.error("Error in createFlat:", error);
            throw error;
        }
    }

    static async updateFlat(flatId, updateData) {
        try {
            return await sequelize.transaction(async (t) => {
                const { block_id, tower_id, floor_id, flat_number, type, area, parking_slots, status } = updateData;

                const flat = await Flat.findByPk(flatId, { transaction: t });
                if (!flat) throw { status: 404, message: "errors.flat_not_found" };

                const targetFloorId = floor_id || flat.floor_id;
                const targetTowerId = tower_id || flat.tower_id;

                if (floor_id && (floor_id !== flat.floor_id || tower_id !== flat.tower_id)) {
                    const floor = await Floor.findOne({
                        where: { id: floor_id, tower_id: targetTowerId },
                        transaction: t
                    });
                    if (!floor) throw { status: 400, message: "errors.floor_not_found" };
                }

                if (flat_number && (flat_number !== flat.flat_number || floor_id !== flat.floor_id)) {
                    const existingFlat = await Flat.findOne({
                        where: { floor_id: targetFloorId, flat_number, id: { [Op.ne]: flatId } },
                        transaction: t
                    });
                    if (existingFlat) throw { status: 400, message: "errors.flat_already_exists" };
                }

                const updateFields = {};
                if (block_id !== undefined) updateFields.block_id = block_id;
                if (tower_id !== undefined) updateFields.tower_id = tower_id;
                if (floor_id !== undefined) updateFields.floor_id = floor_id;
                if (flat_number !== undefined) updateFields.flat_number = flat_number;
                if (type !== undefined) updateFields.type = type;
                if (area !== undefined) updateFields.area = area;
                if (parking_slots !== undefined) updateFields.parking_slots = parking_slots;
                if (status !== undefined) updateFields.status = status;

                if (Object.keys(updateFields).length > 0) {
                    await flat.update(updateFields, { transaction: t });
                }

                return await this.getFlatById(flatId, t);
            });
        } catch (error) {
            console.error("Error in updateFlat:", error);
            throw error;
        }
    }

    static async deleteFlat(flatId) {
        const flat = await Flat.findByPk(flatId);
        if (!flat) throw { status: 404, message: "errors.flat_not_found" };

        await flat.destroy();
        return { message: "messages.flat_deleted_successfully" };
    }
}

module.exports = FlatService;
