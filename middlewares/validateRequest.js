const { validationResult } = require("express-validator");
const { removeFile } = require("../utils/UploadUtils");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        removeFile(req.file);

        const errorArray = errors.array().map(err => ({
            field: err.path,
            message: err.msg,
        }));

        return res.status(400).json({
            status: false,
            message: errorArray[0].message,
            errors: errorArray
        });
    }
    next();
};