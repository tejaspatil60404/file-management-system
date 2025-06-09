// backend/routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadFile, getAllFiles } = require('../controllers/fileController');

// Configure Multer to save files to /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // relative to backend/
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Test GET route
router.get('/', (req, res) => {
  res.send("File management API working ✅");
});

// Upload route
router.post('/upload', upload.single('file'), uploadFile);

// Import the controller function to get all files
router.get('/list', getAllFiles);  // 👈 New route to list all files

module.exports = router;
