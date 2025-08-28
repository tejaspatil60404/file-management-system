// ==========================================================================
// File: /backend/server.js (CORRECTED & SAFE)
// ==========================================================================
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const sequelize = require('./src/config/db');

// --- Import All Models ---
const User = require('./src/models/userModel');
const Event = require('./src/models/eventModel');
const GalleryItem = require('./src/models/galleryItemModel');
const Document = require('./src/models/documentModel');
const CounsellorAssignment = require('./src/models/counsellorAssignmentModel');
const SadhanaRecord = require('./src/models/sadhanaRecordModel');
const SundaySchool = require('./src/models/sundaySchoolModel');
const Donation = require('./src/models/donationModel');

// --- Define All Relationships in One Central Place ---
Event.hasMany(GalleryItem, { foreignKey: 'eventId' });
GalleryItem.belongsTo(Event, { foreignKey: 'eventId' });

User.hasMany(Document, { foreignKey: 'uploaderId' });
Document.belongsTo(User, { foreignKey: 'uploaderId' });

User.hasMany(CounsellorAssignment, { foreignKey: 'counsellorId', as: 'AssignmentsAsCounsellor' });
CounsellorAssignment.belongsTo(User, { foreignKey: 'counsellorId', as: 'Counsellor' });
User.hasOne(CounsellorAssignment, { foreignKey: 'userId', as: 'AssignmentAsCounselee' });
CounsellorAssignment.belongsTo(User, { foreignKey: 'userId', as: 'Counselee' });

User.hasMany(SadhanaRecord, { foreignKey: 'counsellorId', as: 'AuthoredRecords' });
SadhanaRecord.belongsTo(User, { foreignKey: 'counsellorId', as: 'Author' });
User.hasMany(SadhanaRecord, { foreignKey: 'userId', as: 'SadhanaEntries' });
SadhanaRecord.belongsTo(User, { foreignKey: 'userId', as: 'SubjectUser' });

User.hasMany(Donation, { foreignKey: 'userId' });
Donation.belongsTo(User, { foreignKey: 'userId' });


// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const userRoutes = require('./src/routes/userRoutes');
const sadhanaRoutes = require('./src/routes/sadhanaRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const galleryRoutes = require('./src/routes/galleryRoutes');
const documentRoutes = require('./src/routes/documentRoutes');
const sundaySchoolRoutes = require('./src/routes/sundaySchoolRoutes');
const donationRoutes = require('./src/routes/donationRoutes');

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
app.use('/api/donations', donationRoutes);

// --- Make 'uploads' folder static ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection & Server Startup ---
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connection has been established successfully.');
    
    // --- UPDATED: Use { alter: true } to force table updates ---
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server is running on your network at http://192.168.43.159:${PORT}`);
});
  } catch (error)    {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
