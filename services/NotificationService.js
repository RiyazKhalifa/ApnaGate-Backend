"use strict";

const { Notification, Customer } = require("../models");

class NotificationService {
    static async list(params = {}) {
        const { page = 1, limit = 10, search = "" } = params;
        const offset = (page - 1) * limit;

        const where = {};
        // Add search logic if needed, e.g., on title or message
        // if (search) { ... }

        const { count, rows } = await Notification.findAndCountAll({
            where,
            include: [
                {
                    model: Customer,
                    as: "customer",
                    attributes: ["id", "name", "email"]
                }
            ],
            order: [["created_at", "DESC"]],
            limit: parseInt(limit),
            offset: parseInt(offset),
            paranoid: true
        });

        return {
            message: "messages.notifications_retrieved",
            data: {
                total: count,
                pages: Math.ceil(count / limit),
                current_page: parseInt(page),
                notifications: rows.map(item => ({
                    id: item.id,
                    customer: item.customer ? {
                        id: item.customer.id,
                        name: item.customer.name,
                        email: item.customer.email
                    } : null,
                    type: item.type,
                    title: item.title,
                    message: item.message,
                    is_read: item.is_read,
                    created_at: item.created_at
                }))
            }
        };
    }
}

module.exports = NotificationService;
