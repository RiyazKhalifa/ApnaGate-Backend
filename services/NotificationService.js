"use strict";

const { Notification } = require("../models");

class NotificationService {
    static async list(params = {}) {
        const { page = 1, limit = 10, search = "" } = params;
        const offset = (page - 1) * limit;

        const where = {};
        // Add search logic if needed, e.g., on title or message
        // if (search) { ... }

        const { count, rows } = await Notification.findAndCountAll({
            where,
            order: [["created_at", "DESC"]],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        return {
            message: "messages.notifications_retrieved",
            data: {
                total: count,
                pages: Math.ceil(count / limit),
                current_page: parseInt(page),
                notifications: rows.map(item => ({
                    id: item.id,
                    recipient_type: item.recipient_type,
                    recipient_id: item.recipient_id,
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
