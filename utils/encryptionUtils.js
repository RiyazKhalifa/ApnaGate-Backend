const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY
    ? Buffer.from(process.env.ENCRYPTION_KEY, "hex")
    : crypto.randomBytes(32);

if (secretKey.length !== 32) {
    throw new Error("ENCRYPTION_KEY must be 32 bytes (64 hex characters)");
}

const encrypt = (text) => {
    if (!text) return null;
    const currentIv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), currentIv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return currentIv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text) => {
    if (!text) return null;
    try {
        const textParts = text.split(":");
        const currentIv = Buffer.from(textParts.shift(), "hex");
        const encryptedText = Buffer.from(textParts.join(":"), "hex");
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), currentIv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

module.exports = { encrypt, decrypt };
