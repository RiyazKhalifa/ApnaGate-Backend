const { errorResponse } = require("../utils/Response");

module.exports = (err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;
    const originalMessage = typeof err === "string" ? err : err.message || "Something went wrong";
    const translatedMessage = req.t ? req.t(originalMessage) : originalMessage;
    const data = err.data || null;

    if (res.fail) {
        res.fail(translatedMessage, data, status);
    } else {
        errorResponse(res, translatedMessage, data, status);
    }
};