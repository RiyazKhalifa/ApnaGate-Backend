const successResponse = (res, message, data = {}, status = 200) => {
    return res.status(status).json({
        status: true,
        message,
        data,
    });
};

const errorResponse = (res, message, data = {}, status = 500) => {
    return res.status(status).json({
        status: false,
        message,
        data,
    });
};

module.exports = { successResponse, errorResponse };