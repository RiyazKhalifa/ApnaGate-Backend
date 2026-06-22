const { successResponse, errorResponse } = require("../utils/Response");

module.exports = (req, res, next) => {
    res.success = (message, data = {}, status = 200) =>
        successResponse(res, req.t ? req.t(message) : message, data, status);

    res.fail = (message, data = {}, status = 500) =>
        errorResponse(res, req.t ? req.t(message) : message, data, status);

    next();
};