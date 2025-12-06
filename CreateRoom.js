// createRooms.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Room = require("./models/Room");

dotenv.config();

const rooms = [
  { name: "Room 16", capacity: 45, location: "Building A - Floor 2", available: true },
  { name: "Room 19", capacity: 45, location: "Building A - Floor 2", available: true },
  { name: "Room 31", capacity: 60, location: "Building A - Floor 1", available: true },
  { name: "Room 32", capacity: 60, location: "Building A - Floor 1", available: true },
  { name: "Room 33", capacity: 60, location: "Building A - Floor 1", available: true },
  { name: "Room 41", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 42", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 43", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 44", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 45", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 46", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 47", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 48", capacity: 30, location: "Building A - Floor 1", available: true },
  { name: "Room 50", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 52", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 54", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 55", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 56", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 57", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 58", capacity: 55, location: "Building A - Floor 1", available: true },
  { name: "Room 60", capacity: 80, location: "Building A - Floor 1", available: true },
  { name: "Lab 60", capacity: 25, location: "Building A - Floor 1", available: true },
  { name: "Lab 61", capacity: 25, location: "Building A - Floor 1", available: true },
  { name: "Lab 62", capacity: 25, location: "Building A - Floor 1", available: true },
  { name: "Lab 63", capacity: 25, location: "Building A - Floor 1", available: true },
  { name: "Lab 64", capacity: 25, location: "Building A - Floor 1", available: true },
  { name: "Lab 17", capacity: 25, location: "Building A - Floor 2", available: true },
  { name: "Lab 18", capacity: 25, location: "Building A - Floor 2", available: true },
];

async function seedRooms() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Room.deleteMany({});
    console.log("Old rooms deleted");

    await Room.insertMany(rooms);
    console.log("New rooms added successfully!");

    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

seedRooms();
