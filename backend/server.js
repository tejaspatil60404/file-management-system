// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies from incoming requests

// --- Database Connection ---
// We will add the connection logic here once you have your MongoDB Atlas URI
// const dbURI = process.env.MONGODB_URI;
// mongoose.connect(dbURI)...

// --- Routes ---
// A simple test route to check if the server is running
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the ISKCON Backend!' });
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
