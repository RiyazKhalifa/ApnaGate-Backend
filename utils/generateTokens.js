const jwt = require("jsonwebtoken");
const { parseExpiryToMs } = require("./common");

const generateTokens = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
        status: user.status,
        role: user.role ? user.role.name : null,
        permissions: user.role?.permissions?.map(p => p.name) || []
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXP,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXP,
    });

    return {
        accessToken,
        refreshToken,
        accessTokenExpiresIn: Date.now() + parseExpiryToMs(process.env.JWT_ACCESS_EXP),
        refreshTokenExpiresIn: Date.now() + parseExpiryToMs(process.env.JWT_REFRESH_EXP),
    };
};

const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
        status: user.status,
        role: user.role ? user.role.name : null,
        permissions: user.role?.permissions?.map(p => p.name) || []
    };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXP,
    });

    return {
        accessToken,
        accessTokenExpiresIn: Date.now() + parseExpiryToMs(process.env.JWT_ACCESS_EXP),
    };
};

module.exports = { generateTokens, generateAccessToken };