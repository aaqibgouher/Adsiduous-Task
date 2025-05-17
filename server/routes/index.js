const express = require("express");

// routes
const authRoutes = require("./authRoutes");
const fileRoutes = require("./fileRoutes");

// middleware
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// auth
router.use("/auth", authRoutes);

// files
router.use("/files", authMiddleware.isAuthenticated, fileRoutes);

module.exports = router;
