// backend/src/routes/uploadRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // The 'uploads' folder needs to be in the root of the backend directory
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    // Create a unique filename to prevent overwrites
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// --- Multer Upload Middleware ---
const upload = multer({
  storage,
  // You can add file type validation here if needed
});

// @route   POST /api/upload
// @desc    Upload a file
// @access  Private/Admin
router.post('/', protect, admin, upload.single('file'), (req, res) => {
  // 'upload.single('file')' processes a single file upload from a form field named 'file'.
  // If the upload is successful, req.file will contain the file information.
  
  if (req.file) {
    // We send back the path to the file, which the frontend will use.
    // The path needs to be formatted correctly for the browser to access it.
    res.send({
      message: 'File uploaded successfully',
      filePath: `/${req.file.path.replace(/\\/g, "/")}`, // Standardize path for web
    });
  } else {
    res.status(400).send({ message: 'Please upload a file' });
  }
});

module.exports = router;
