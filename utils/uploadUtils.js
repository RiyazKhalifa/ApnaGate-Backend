const multer = require("multer");
const path = require("path");
const fs = require("fs");

function makeUploader(subfolder) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            try {
                let uploadDir = path.resolve(__dirname, `../uploads/${subfolder}`);

                fs.mkdirSync(uploadDir, { recursive: true });
                cb(null, uploadDir);
            } catch (err) {
                cb(err);
            }
        },
        filename: (_, file, cb) => {
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName);
        },
    });

    const fileFilter = (_, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isValid =
            allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
            allowedTypes.test(file.mimetype);

        if (isValid) cb(null, true);
        else cb(new Error("Only .jpg, .jpeg, .png files are allowed!"));
    };

    let fileSizeLimit = 50 * 1024 * 1024;

    return multer({
        storage,
        limits: { fileSize: fileSizeLimit },
        fileFilter,
    });
}

function removeFile(file) {
    if (file?.path) {
        fs.unlink(file.path, (err) => {
            if (err && err.code !== "ENOENT") {
                console.error("Failed to remove file:", err);
            }
        });
    }
}

module.exports = { makeUploader, removeFile };