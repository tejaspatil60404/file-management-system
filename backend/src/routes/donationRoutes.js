// File: /backend/src/routes/donationRoutes.js (Add this new route)
// ==========================================================================
const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getDonationHistory } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

// All routes in this file require a user to be logged in
router.use(protect);

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/history', getDonationHistory); // <-- Add the new route

module.exports = router;