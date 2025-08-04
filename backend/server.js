// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./src/config/db'); // Import the new DB connection function

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/authRoutes');

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Database Connection ---
connectDB();

// --- API Routes ---
// Use the authentication routes
// All routes in authRoutes.js will be prefixed with /api/auth
app.use('/api/auth', authRoutes);


// --- Server Startup ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
