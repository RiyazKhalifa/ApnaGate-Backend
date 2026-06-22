const AuthService = require("../services/AuthService");

class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password, req);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }

    static async refresh(req, res, next) {
        try {
            const result = await AuthService.refresh(req, req.refreshToken);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }

    static async logout(req, res, next) {
        try {
            const refreshToken = req.refreshToken;
            const result = await AuthService.logout(refreshToken);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }

    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const result = await AuthService.forgotPassword(email);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }

    static async resetPassword(req, res, next) {
        try {
            const { resetToken, newPassword } = req.body;
            const result = await AuthService.resetPassword(resetToken, newPassword);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }

    static async forceLogout(req, res, next) {
        try {
            const { token } = req.query;
            const result = await AuthService.forceLogout(token);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }

    static async verifyPassword(req, res, next) {
        try {
            const { password } = req.body;
            const userId = req.user.id;
            const result = await AuthService.verifyPassword(userId, password);
            return res.success(result.message, result.data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;
