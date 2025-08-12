// backend/src/routes/sundaySchoolRoutes.js

const express = require('express');
const router = express.Router();
const {
  getSundaySchoolDetails,
  updateSundaySchoolDetails,
} = require('../controllers/sundaySchoolController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to get the details
router.get('/', getSundaySchoolDetails);

// Admin-only route to update the details
router.put('/', protect, admin, updateSundaySchoolDetails);

module.exports = router;
