const { User, UserSession } = require("../models");
const bcrypt = require("../utils/bcryptUtils");

class ProfileService {

    static async getProfile(userId) {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'profile_image', 'status']
        });

        if (!user) throw { status: 404, message: 'errors.user_not_found' };
        return user;
    }

    static async updateProfile(userId, updateData) {
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'profile_image', 'status']
        });
        if (!user) throw { status: 404, message: 'errors.user_not_found' };

        const updatedUser = await user.update(updateData);
        return updatedUser;
    }

    static async changePassword(userId, currentPassword, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) throw { status: 404, message: 'errors.user_not_found' };

        const isValid = await bcrypt.comparePassword(currentPassword, user.password);
        if (!isValid) throw { status: 400, message: 'errors.current_password_incorrect' };

        const isSame = await bcrypt.comparePassword(newPassword, user.password);
        if (isSame) throw { status: 400, message: 'errors.new_password_same_as_current' };

        const hashedPassword = await bcrypt.hashPassword(newPassword);
        await user.update({ password: hashedPassword });

        await UserSession.destroy({ where: { userId } });

        return null;
    }
}

module.exports = ProfileService;