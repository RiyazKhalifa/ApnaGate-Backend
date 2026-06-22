const ProfileService = require("../services/ProfileService");
const { removeFile } = require("../utils/UploadUtils");
const UserService = require("../services/UserService");

class ProfileController {

    static async getProfile(req, res) {
        try {
            const id = req.user.id;
            const profile = await ProfileService.getProfile(id);
            return res.success("messages.profile_retrieved", profile);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateProfile(req, res) {
        try {
            const id = req.user.id;
            const updateData = req.body;

            if (req.file) {
                const existingUser = await UserService.getUserById(id);
                if (existingUser?.profile_image) removeFile({ path: `.${existingUser.profile_image}` });
                updateData.profile_image = `/uploads/users/${req.file.filename}`;
            }

            const updatedProfile = await ProfileService.updateProfile(id, updateData);

            return res.success("messages.profile_updated", updatedProfile);
        } catch (error) {
            if (req.file) removeFile({ path: `./uploads/users/${req.file.filename}` });
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async changePassword(req, res) {
        try {
            const id = req.user.id;
            const { currentPassword, newPassword } = req.body;
            await ProfileService.changePassword(id, currentPassword, newPassword);
            return res.success("messages.password_changed");
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}

module.exports = ProfileController;