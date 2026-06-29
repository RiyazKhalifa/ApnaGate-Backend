const db = require("./models");
require("@dotenvx/dotenvx").config();
process.env.TZ = process.env.TIMEZONE || 'Asia/Kolkata';
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/ErrorHandler");
const responseHandler = require("./middlewares/ResponseHandler");
const { logReqRes } = require("./middlewares/LogsMiddleware");
const { i18next, middleware } = require("./config/i18n");
const path = require("path");
const adminRoutes = require("./routes/admin");
const residentRoutes = require("./routes/resident");

const app = express();

// Middleware
app.use(express.json());
app.use(middleware.handle(i18next));
app.use(responseHandler);
app.use(logReqRes());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token", "refresh-token", "Accept-Language"],
    credentials: true
}));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/resident", residentRoutes);

app.get("/", (req, res) => res.send("Welcome to the Excellent WebWorld API"));

// Error handler
app.use(errorHandler);

db.sequelize.sync().then(() => {
    console.log("MySQL DB Connected");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch((err) => {
    console.error("DB connection error:", err);
});
