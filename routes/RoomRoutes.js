// 📁 RoomRoutes.js
// All API endpoints related to rooms (fetching, creating, updating)

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getRooms,
  createRoom,
  updateRoomAvailability,
} = require("../controllers/RoomController");

// 📋 Get all rooms
// GET /api/rooms
// Used by: Rooms.jsx
router.get("/", getRooms);

// ➕ Create a new room
// POST /api/rooms
router.post("/", createRoom);

// 🔁 Update room availability
// PATCH /api/rooms/:id
router.patch("/:id", updateRoomAvailability);

module.exports = router;

