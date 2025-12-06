// This file handles all the logic related to users (register, login, profile).
// It’s where we connect what the route says to what the database actually does.

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Helper function to create a JSON Web Token (JWT) for authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // token valid for 7 days
};

// 🧩 Register a new user
const registerUser = async (req, res) => {
  try {
    // log incoming data to debug issues
    console.log("📥 Incoming register data:", req.body);
    const { name, email, password, role } = req.body;

    // Check if the user already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists 😅' });
    }

    // Hash the password before saving (so we don't store plain text passwords)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Send back a success response with a token
    res.status(201).json({
      message: '🎉 User registered successfully!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('❌ Error registering user:', error);
    res.status(500).json({ message: 'Server error while registering user' });
  }
};

// 🔐 Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔐 Login attempt for:", email);

    // Validate email domain
    if (!email.endsWith('@uqu.edu.sa')) {
      return res.status(400).json({ 
        message: 'Please use your official university email ending with @uqu.edu.sa' 
      });
    }

    // Find user
    let user = await User.findOne({ email });

    // If user doesn't exist, auto-create them (for university emails only)
    if (!user) {
      console.log("👤 User not found, creating new user automatically...");
      
      // Extract name from email (before @)
      const name = email.split('@')[0].replace(/[._]/g, ' ');
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      user = await User.create({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        email,
        password: hashedPassword,
        role: 'student',
      });

      console.log("✅ New user created:", user._id);

      // Return success for newly created user
      return res.status(200).json({
        message: '✅ Account created and logged in successfully!',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    }

    // User exists - verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password 🤔' });
    }

    // Successful login
    res.status(200).json({
      message: '✅ Login successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('❌ Error logging in user:', error);
    res.status(500).json({ message: 'Server error while logging in' });
  }
};

// 👤 Get user profile
const getUserProfile = async (req, res) => {
  try {
    res.status(200).json({ message: 'This is the user profile route 🧾' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
