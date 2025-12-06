// 📁 UserRoutes.js
// All API endpoints related to users (register, login, profile)

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/UserController");
// 🧍 Register new user
// POST /api/users/register
router.post("/register", registerUser);

// 🔐 Login user
// POST /api/users/login
// USED BY FRONTEND: authService.login()
router.post("/login", loginUser);

// 👤 Get current user profile
// GET /api/users/profile
// Used only if the frontend wants user info later.
router.get("/profile", getUserProfile);

module.exports = router;

