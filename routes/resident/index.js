const express = require('express');
const router = express.Router();

const residentAuthRoutes = require('./ResidentAuthRoutes');

router.use("/auth", residentAuthRoutes);

module.exports = router;
