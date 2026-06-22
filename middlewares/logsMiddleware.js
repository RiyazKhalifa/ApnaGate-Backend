const fs = require("fs");
const path = require("path");
require('dotenv').config();

function logReqRes() {
    return (req, res, next) => {
        // Format current timestamp
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-GB", {
            timeZone: process.env.TIMEZONE || "Asia/Kuwait",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
        const parts = formatter.formatToParts(now).reduce((acc, part) => {
            if (part.type !== "literal") acc[part.type] = part.value;
            return acc;
        }, {});

        // Ensure logs directory exists
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true, mode: 0o777 });
        }

        // Determine module name from URL path (default: 'general')
        const pathParts = req.path.split('/');
        let moduleName = 'general';

        if (pathParts.length > 3 && pathParts[1] === 'api' && pathParts[2] === 'admin') {
            moduleName = pathParts[3];
        }

        // Skip logging for unnecessary modules
        if (moduleName === 'general') {
            return next();
        }

        // Ensure module-specific directory exists
        const prefixDir = path.join(logDir, moduleName);
        if (!fs.existsSync(prefixDir)) {
            fs.mkdirSync(prefixDir, { recursive: true, mode: 0o777 });
        }

        // Prepare log file path and entry
        const fileName = `${parts.year}_${parts.month}_${parts.day}_${parts.hour}.log`;
        const filePath = path.join(prefixDir, fileName);
        const currentDateTime = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
        const requestBody = req.body && Object.keys(req.body).length > 0 ? `Body => ${JSON.stringify(req.body)}\n` : '';
        const clientIp = req.headers["x-real-ip"] || req.ip;
        const logEntry = `\n${currentDateTime} | ${clientIp} => ${req.method} ${req.originalUrl}\nHeaders => ${JSON.stringify(req.headers)}\n${requestBody}`;

        // Log request
        fs.appendFile(filePath, logEntry, (err) => {
            if (err) console.error("Error writing request log:", err);
        });

        // Override res.send to log responses
        const originalSend = res.send;
        res.send = function (body) {
            const bodyStr = typeof body === 'object' ? JSON.stringify(body) : String(body);
            const responseLog = `Response: ${res?.statusCode} | Body => ${bodyStr}\n`;
            fs.appendFile(filePath, responseLog, (err) => {
                if (err) console.error("Error writing response log:", err);
            });
            return originalSend.call(this, body);
        };

        next();
    };
}

module.exports = {
    logReqRes,
};
