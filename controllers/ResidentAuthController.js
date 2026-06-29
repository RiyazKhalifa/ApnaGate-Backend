const ResidentAuthService = require("../services/ResidentAuthService");

class ResidentAuthController {
    static async register(req, res, next) {
        try {
            const result = await ResidentAuthService.register(req.body, req);
            return res.success(req.t(result.message), result.data);
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await ResidentAuthService.login(email, password, req);
            return res.success(req.t(result.message), result.data);
        } catch (err) {
            next(err);
        }
    }

    static async refresh(req, res, next) {
        try {
            const result = await ResidentAuthService.refresh(req, req.refreshToken);
            return res.success(req.t(result.message), result.data);
        } catch (err) {
            next(err);
        }
    }

    static async logout(req, res, next) {
        try {
            const refreshToken = req.refreshToken;
            const result = await ResidentAuthService.logout(refreshToken);
            return res.success(req.t(result.message), result.data);
        } catch (err) {
            next(err);
        }
    }

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const result = await ResidentAuthService.forgotPassword(email);
            return res.success(req.t(result.message), result.data);
        } catch (err) {
            next(err);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { resetToken, newPassword } = req.body;
            const result = await ResidentAuthService.resetPassword(resetToken, newPassword);
            return res.success(req.t(result.message), result.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ResidentAuthController;
