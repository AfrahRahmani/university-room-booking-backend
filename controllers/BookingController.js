// 📦 BookingController.js
// This controller handles ALL booking-related logic:
// - creating bookings
// - fetching bookings for a user
// - canceling bookings
// - loading ALL bookings (admin reports)

const Booking = require("../models/Booking");

// 🧾 Create a new booking (with time conflict prevention)
const createBooking = async (req, res) => {
  try {
    const { user, room, date, startTime, endTime } = req.body;

    // 🔍 1) Check if there's already a booking for this room at this time
    const conflict = await Booking.findOne({
      room,
      date,
      $or: [
        // Time overlap logic
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    if (conflict) {
      return res.status(400).json({
        message: "⛔ This room is already booked during this time.",
      });
    }

    // 🏗 2) Create booking if no conflict
    const newBooking = await Booking.create({
      user,
      room,
      date,
      startTime,
      endTime,
    });

    res.status(201).json({
      message: "🎉 Booking created successfully!",
      data: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({
      message: "Server error while creating booking",
    });
  }
};

// 👤 Get bookings for a specific user
const getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Return full booking objects with room + user
    const bookings = await Booking.find({ user: userId })
      .populate("room")
      .populate("user");

    // FRONTEND expects array directly
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error loading user bookings:", error);
    res.status(500).json({ message: "Server error while loading user bookings" });
  }
};


// ❌ Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const deleted = await Booking.findByIdAndDelete(bookingId);

    if (!deleted) {
      return res.status(404).json({ message: "Booking not found ❗" });
    }

    res.status(200).json({
      message: "🗑️ Booking cancelled successfully",
    });
  } catch (error) {
    console.error("❌ Error canceling booking:", error);
    res.status(500).json({
      message: "Server error while canceling booking",
    });
  }
};

// 📊 Load ALL bookings (Admin report) 
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("room")
      .populate("user");

    // Send array directly to match frontend expectations
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error loading all bookings:", error);
    res.status(500).json({ message: "Server error while loading all bookings" });
  }
};


// 📦 Export all controller functions
module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getAllBookings,
};
