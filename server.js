// 🧠 server.js - Main entry point of your backend application

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
// 🌐 CRITICAL: Enable CORS before other middleware

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', 
  'http://localhost:5174',
  process.env.FRONTEND_URL
  ].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('⚠️ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// 🌐 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// 📦 Import route files
const userRoutes = require('./routes/UserRoutes');
const roomRoutes = require('./routes/RoomRoutes');
const bookingRoutes = require('./routes/BookingRoutes');

// 🛣️ Define main API routes
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// 🧩 Default route (for testing)
app.get('/', (req, res) => {
  res.send('🎉 University Room Booking API is running...');
});

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
// 🧯 Global error handler (this must be the LAST middleware)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Test it at: http://localhost:${PORT}`);
  console.log(`🌐 CORS enabled for ports: 3000, 5173, 5174`);
});

// Handle errors
process.on('unhandledRejection', (err) => {
  console.log('❌ UNHANDLED REJECTION:', err.message);
});

process.on('uncaughtException', (err) => {
  console.log('❌ UNCAUGHT EXCEPTION:', err.message);
});
