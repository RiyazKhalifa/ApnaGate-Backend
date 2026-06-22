const jwt = require("jsonwebtoken");
const { UserSession } = require("../models");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.fail("errors.invalid_token", {}, 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        const session = await UserSession.findOne({
            where: { accessToken: token, userId: decoded.id }
        });

        if (!session) {
            return res.fail("errors.invalid_token", {}, 401);
        }

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            permissions: decoded.permissions || []
        };
        req.session = session;

        next();
    } catch (err) {
        return res.fail("errors.invalid_token", {}, 401);
    }
};

module.exports = authMiddleware;