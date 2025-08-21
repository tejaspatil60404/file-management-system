// File: /backend/src/routes/donationRoutes.js (New File)
// ==========================================================================
const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

// All routes in this file require a user to be logged in
router.use(protect);

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

module.exports = router;
