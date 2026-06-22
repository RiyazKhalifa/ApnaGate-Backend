const UserService = require("../services/UserService");
const { removeFile } = require("../utils/UploadUtils");

class UserController {
    static async getAllUsers(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;
            const result = await UserService.getAllUsers(page, limit, search, false, sortBy, sortOrder);
            return res.success("messages.users_retrieved", result);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error");
        }
    }

    static async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await UserService.getUserById(id);
            return res.success("messages.user_retrieved", user);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async createUser(req, res) {
        try {
            const lang = req.headers["accept-language"] || "en";
            const userData = req.body;
            if (req.file) userData.profile_image = `/uploads/users/${req.file.filename}`;

            const newUser = await UserService.createUser(userData, lang);

            return res.success("messages.user_created", newUser, 201);
        } catch (error) {
            removeFile(req.file);
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async updateUser(req, res) {
        try {
            const id = req.params.id;
            const updateData = req.body;

            if (req.file) {
                const existingUser = await UserService.getUserById(id);
                if (existingUser?.profile_image) {
                    removeFile({ path: `.${existingUser.profile_image}` });
                }
                updateData.profile_image = `/uploads/users/${req.file.filename}`;
            }

            const updatedUser = await UserService.updateUser(id, updateData);

            return res.success("messages.user_updated", updatedUser);
        } catch (error) {
            removeFile(req.file);
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const result = await UserService.deleteUser(id);
            return res.success(result.message);
        } catch (error) {
            return res.fail(error.message || "errors.internal_error", error.status);
        }
    }
}


module.exports = UserController;