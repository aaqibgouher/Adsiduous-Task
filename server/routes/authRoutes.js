const express = require("express");
const authController = require("../controller/authController");
const authMiddlware = require("../middleware/authMiddleware");

const router = express.Router();

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);

// logout
router.post("/logout", authMiddlware.isAuthenticated, authController.logout);

// get me
router.get("/me", authMiddlware.isAuthenticated, authController.getMe);

module.exports = router;
