// This file controls everything related to rooms in our app.
// We’ll use it to get a list of rooms, create new ones, and update their status.

const Room = require("../models/Room");

// 📋 Get all available rooms
// This endpoint returns a clean array of rooms for the frontend.
const getRooms = async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.find();

    // Return the array directly so the frontend can map over it easily
    res.status(200).json(rooms);
  } catch (error) {
    console.error("❌ Error fetching rooms:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching rooms" });
  }
};

// ➕ Create a new room (for admins or instructors maybe)
const createRoom = async (req, res) => {
  try {
    const { name, capacity, location } = req.body;

    // Create a new room in the database
    const newRoom = await Room.create({
      name,
      capacity,
      location,
      available: true,
    });

    res.status(201).json({
      message: `🎉 Room "${name}" created successfully!`,
      room: newRoom,
    });
  } catch (error) {
    console.error("❌ Error creating room:", error);
    res
      .status(500)
      .json({ message: "Server error while creating room" });
  }
};

// 🔁 Update a room’s availability (for example: mark it as booked or available)
const updateRoomAvailability = async (req, res) => {
  try {
    const roomId = req.params.id;
    const { available } = req.body;

    // Find the room by its ID and update the availability
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { available },
      { new: true }
    );

    if (!updatedRoom) {
      return res
        .status(404)
        .json({ message: "Room not found 🕵️‍♀️" });
    }

    res.status(200).json({
      message: "✅ Room availability updated successfully!",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("❌ Error updating room availability:", error);
    res
      .status(500)
      .json({ message: "Server error while updating room" });
  }
};

// Export the functions so our routes can use them
module.exports = {
  getRooms,
  createRoom,
  updateRoomAvailability,
};
