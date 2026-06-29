const { User, Resident, UserSession, Role, Society, Flat, Block, Tower, Floor } = require("../models");
const { generateTokens, generateAccessToken } = require("../utils/GenerateTokens");
const { comparePassword, hashPassword } = require("../utils/BcryptUtils");
const { sendPasswordResetEmail, sendLoginAlertEmail } = require("../utils/EmailService");
const crypto = require("crypto");
const { Op } = require("sequelize");

class ResidentAuthService {
    static async register(data, req) {
        const { name, email, password, phone, society_id, flat_id, resident_type, moveInDate, emergency_contact, occupation } = data;

        // Check if email already taken
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw { status: 400, message: "errors.email_already_taken" };
        }

        // Validate Society and Flat
        const society = await Society.findByPk(society_id);
        if (!society) {
            throw { status: 404, message: "errors.society_not_found" };
        }

        const flat = await Flat.findByPk(flat_id);
        if (!flat) {
            throw { status: 404, message: "errors.flat_not_found" };
        }

        // Find or create Resident Role
        const [role] = await Role.findOrCreate({
            where: { name: "Resident" },
            defaults: { name: "Resident", name_ar: "مقيم" }
        });

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: role.id,
            status: "active"
        });

        // Create Resident
        const resident = await Resident.create({
            user_id: user.id,
            society_id,
            flat_id,
            resident_type,
            moveInDate: moveInDate,
            phone,
            emergency_contact: emergency_contact || null,
            occupation: occupation || null,
            status: "active"
        });

        // Generate tokens
        const tokens = generateTokens(user);
        const deviceInfo = req.headers["user-agent"] || "Unknown device";
        const ipAddress = req.ip || "Unknown IP";

        await UserSession.create({
            userId: user.id,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            deviceInfo,
            ipAddress,
            lastUsedAt: new Date(),
            userAgent: deviceInfo
        });

        // Return token and resident payload
        const residentDetails = await Resident.findOne({
            where: { id: resident.id },
            include: [
                {
                    model: Flat,
                    as: "flat",
                    include: [
                        { model: Block, as: "block", attributes: ["id", "name"] },
                        { model: Tower, as: "tower", attributes: ["id", "name"] },
                        { model: Floor, as: "floor", attributes: ["id", "floor_number"] }
                    ]
                },
                { model: Society, as: "society", attributes: ["id", "name"] }
            ]
        });

        return {
            message: "messages.register_success",
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                accessTokenExpiresIn: tokens.accessTokenExpiresIn,
                refreshTokenExpiresIn: tokens.refreshTokenExpiresIn,
                profile: {
                    id: resident.id,
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: resident.phone,
                    resident_type: resident.resident_type,
                    moveInDate: resident.move_in_date,
                    status: resident.status,
                    society: residentDetails?.society,
                    flat: residentDetails?.flat
                }
            }
        };
    }

    static async login(email, password, req) {
        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    as: "role",
                    attributes: ["id", "name"]
                }
            ]
        });

        if (!user) throw { status: 401, message: "errors.invalid_credentials" };

        const isValid = await comparePassword(password, user.password);
        if (!isValid) throw { status: 401, message: "errors.invalid_credentials" };

        // Verify user is a resident
        const resident = await Resident.findOne({
            where: { user_id: user.id },
            include: [
                {
                    model: Flat,
                    as: "flat",
                    include: [
                        { model: Block, as: "block", attributes: ["id", "name"] },
                        { model: Tower, as: "tower", attributes: ["id", "name"] },
                        { model: Floor, as: "floor", attributes: ["id", "floor_number"] }
                    ]
                },
                { model: Society, as: "society", attributes: ["id", "name"] }
            ]
        });

        if (!resident) {
            throw { status: 403, message: "errors.not_authorized_as_resident" };
        }

        if (resident.status !== "active") {
            throw { status: 403, message: "errors.resident_account_inactive" };
        }

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

        // Send login alert email if user has more than one session
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
                refreshTokenExpiresIn: tokens.refreshTokenExpiresIn,
                profile: {
                    id: resident.id,
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: resident.phone,
                    resident_type: resident.resident_type,
                    moveInDate: resident.move_in_date,
                    status: resident.status,
                    society: resident.society,
                    flat: resident.flat
                }
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
        const user = await User.findOne({
            where: { email },
            include: [{ model: Role, as: "role" }]
        });

        if (!user) throw { status: 400, message: "errors.user_not_found" };

        // Verify they are a resident
        const resident = await Resident.findOne({ where: { user_id: user.id } });
        if (!resident) throw { status: 403, message: "errors.not_authorized_as_resident" };

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
}

module.exports = ResidentAuthService;
