"use strict";

const NotificationService = require("../services/NotificationService");

class NotificationController {
    static async index(req, res, next) {
        try {
            const result = await NotificationService.list(req.query);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NotificationController;
