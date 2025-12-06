// 📁 BookingRoutes.js
// This file defines all booking-related API endpoints.

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/BookingController");

// 📊 Admin: Get ALL bookings
// URL: GET /api/bookings
router.get("/", getAllBookings);

// 🧾 Create a new booking
// URL: POST /api/bookings
router.post("/", createBooking);

// 👤 Get bookings for a specific user
// URL: GET /api/bookings/:userId
router.get("/:userId", getUserBookings);

// ❌ Cancel a booking
// URL: DELETE /api/bookings/cancel/:id
router.delete("/cancel/:id", cancelBooking);

// Export router
module.exports = router;

