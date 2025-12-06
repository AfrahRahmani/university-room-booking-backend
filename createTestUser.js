// createTestUser.js - Run this once to create a test user
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if user already exists
    const existing = await User.findOne({ email: "student@uqu.edu.sa" });
    if (existing) {
      console.log("⚠️ Test user already exists!");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create test user
    const testUser = await User.create({
      name: "Test Student",
      email: "student@uqu.edu.sa",
      password: hashedPassword,
      role: "student",
    });

    console.log("🎉 Test user created successfully!");
    console.log("📧 Email: student@uqu.edu.sa");
    console.log("🔑 Password: password123");

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createTestUser();