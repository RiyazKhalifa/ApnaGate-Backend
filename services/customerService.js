const { Customer } = require("../models");
const { Op } = require("sequelize");

class CustomerService {
    static async getAllCustomers(page = 1, limit = 10, search = '', sortBy = '', sortOrder = '') {
        try {
            const offset = (page - 1) * limit;

            const whereClause = search ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            } : {};

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
                    case 'id':
                        orderClause = [['id', validSortOrder]];
                        break;
                    default:
                        orderClause = [[sortBy, validSortOrder]];
                        break;
                }
            }

            const { count, rows } = await Customer.findAndCountAll({
                where: whereClause,
                attributes: [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'status',
                    'profile_image',
                    'created_at',
                    'updated_at'
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: orderClause
            });

            return {
                customers: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            };
        } catch (error) {
            console.error("Error in CustomerService.getAllCustomers:", error);
            throw error;
        }
    }

    static async getCustomerById(customerId, transaction = null) {
        try {
            const customer = await Customer.findByPk(customerId, {
                attributes: ['id', 'name', 'email', 'phone', 'status', 'profile_image', 'created_at', 'updated_at'],
                transaction
            });

            if (!customer) throw { status: 404, message: 'errors.customer_not_found' };
            return customer;
        } catch (error) {
            console.error("Error in getCustomerById:", error);
            throw error;
        }
    }
}

module.exports = CustomerService;