const { User, UserSession, Role, Permission } = require("../models");
const { generateTokens, generateAccessToken } = require("../utils/GenerateTokens");
const { comparePassword, hashPassword } = require("../utils/BcryptUtils");
const { sendPasswordResetEmail, sendLoginAlertEmail } = require("../utils/EmailService");
const crypto = require("crypto");
const { Op } = require("sequelize");

class AuthService {
    static async login(email, password, req) {
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    as: "role",
                    attributes: ["id", "name"],
                    include: [
                        {
                            model: Permission,
                            as: "permissions",
                            attributes: ["id", "name"],
                            through: { attributes: [] }
                        }
                    ]
                },
                { model: UserSession, as: "userSessions" }
            ]
        });

        if (!user) throw { status: 401, message: "errors.invalid_credentials" };

        const isValid = await comparePassword(password, user.password);
        if (!isValid) throw { status: 401, message: "errors.invalid_credentials" };

        const tokens = generateTokens(user);
        const deviceInfo = req.headers["user-agent"] || "Unknown device";
        const ipAddress = req.ip || "Unknown IP";

        const existingSession = await UserSession.findOne({
            where: { userId: user.id, deviceInfo, ipAddress }
        });

        if (!existingSession) {
            await UserSession.create({
                userId: user.id,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                deviceInfo,
                ipAddress,
                lastUsedAt: new Date(),
                userAgent: deviceInfo
            });
        } else {
            existingSession.accessToken = tokens.accessToken;
            existingSession.refreshToken = tokens.refreshToken;
            existingSession.deviceInfo = deviceInfo;
            existingSession.ipAddress = ipAddress;
            existingSession.lastUsedAt = new Date();
            existingSession.userAgent = deviceInfo;
            await existingSession.save();
        }

        // Send login alert email only if user has more than one session
        const sessionCount = await UserSession.count({ where: { userId: user.id } });
        if (sessionCount > 1) {
            try {
                await sendLoginAlertEmail(user.email, deviceInfo, ipAddress, tokens.refreshToken);
            } catch (error) {
                console.error("Failed to send login alert email:", error);
            }
        }

        return {
            message: "messages.login_success",
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                accessTokenExpiresIn: tokens.accessTokenExpiresIn,
                refreshTokenExpiresIn: tokens.refreshTokenExpiresIn
            }
        };
    }

    static async refresh(req, refreshToken) {
        const session = await UserSession.findOne({
            where: { refreshToken },
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
        });

        if (!session) throw { status: 403, message: "errors.invalid_refresh_token" };

        const user = session.user;

        const { accessToken, accessTokenExpiresIn } = generateAccessToken(user);

        session.accessToken = accessToken;
        session.lastUsedAt = new Date();
        await session.save();

        return {
            status: true,
            message: "messages.access_token_generated",
            data: {
                accessToken,
                accessTokenExpiresIn
            }
        };
    }


    static async logout(refreshToken) {
        const session = await UserSession.findOne({
            where: { refreshToken }
        });
        if (!session) throw { status: 403, message: "errors.invalid_refresh_token" };

        await session.destroy();

        return {
            message: "messages.logout_success",
            data: null
        };
    }

    static async forgotPassword(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw { status: 400, message: "errors.user_not_found" };

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

        user.reset_password_token = resetToken;
        user.reset_password_expires = resetTokenExpiry;
        await user.save();

        try {
            await sendPasswordResetEmail(user.email, resetToken, user.name);
        } catch (error) {
            console.error("Failed to send password reset email:", error);
        }

        return {
            message: "messages.reset_password_email_sent",
            data: null
        };
    }

    static async resetPassword(resetToken, newPassword) {
        const user = await User.findOne({
            where: {
                reset_password_token: resetToken,
                reset_password_expires: { [Op.gt]: new Date() }
            }
        });

        if (!user) throw { status: 400, message: "errors.invalid_reset_token" };

        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        user.reset_password_token = null;
        user.reset_password_expires = null;
        await user.save();

        await UserSession.destroy({ where: { userId: user.id } });

        return {
            message: "messages.password_reset_success",
            data: null
        };
    }

    static async forceLogout(token) {
        const session = await UserSession.findOne({ where: { refreshToken: token } });
        if (!session) throw { status: 400, message: "errors.invalid_token" };

        await session.destroy();

        return {
            message: "messages.force_logout_success",
            data: null
        };
    }

    static async verifyPassword(userId, password) {
        const user = await User.findByPk(userId);
        if (!user) throw { status: 404, message: "errors.user_not_found" };

        const isValid = await comparePassword(password, user.password);
        if (!isValid) throw { status: 401, message: "errors.invalid_password" };

        return {
            message: "messages.password_verified",
            data: { isValid: true }
        };
    }
}

module.exports = AuthService;