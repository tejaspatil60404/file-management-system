// backend/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const sequelize = require('./src/config/db');

// Load environment variables
dotenv.config();

// --- Import Models to register them with Sequelize ---
require('./src/models/userModel');
require('./src/models/eventModel');
require('./src/models/counsellorAssignmentModel');
require('./src/models/sadhanaRecordModel');
require('./src/models/galleryItemModel');
require('./src/models/documentModel');
require('./src/models/sundaySchoolModel');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes');
const sadhanaRoutes = require('./src/routes/sadhanaRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const sundaySchoolRoutes = require('./src/routes/sundaySchoolRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sadhana', sadhanaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/sunday-school', sundaySchoolRoutes);

// --- Make 'uploads' folder static ---
// CORRECTED: Use __dirname for a more reliable path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Database Connection & Server Startup ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connection has been established successfully.');
    
    await sequelize.sync();
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Backend server is running on http://localhost:${PORT}`);
    });
  } catch (error)    {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
