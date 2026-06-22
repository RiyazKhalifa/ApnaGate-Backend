const { User, Role, Permission } = require("../models");

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            const user = await User.findByPk(userId, {
                include: [{
                    model: Role,
                    as: 'role',
                    include: [{
                        model: Permission,
                        as: 'permissions'
                    }]
                }]
            });

            if (!user) {
                return res.fail("errors.user_not_found", 401);
            }

            const role = user.role;
            const hasPermission = role?.permissions?.some(
                permission => permission.name === requiredPermission
            );

            if (!hasPermission) {
                return res.fail("errors.insufficient_permissions", 403);
            }

            req.userWithRoles = user;
            next();
        } catch (error) {
            console.error(error);
            return res.fail("errors.internal_error");
        }
    };
};

module.exports = checkPermission;