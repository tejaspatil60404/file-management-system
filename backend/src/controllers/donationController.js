// File: /backend/src/controllers/donationController.js (New File)
// ==========================================================================
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Donation = require('../models/donationModel');
const User = require('../models/userModel');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order for a donation
// @route   POST /api/donations/create-order
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id; // From 'protect' middleware

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Please enter a valid amount.' });
    }

    const options = {
      amount: amount * 100, // Amount in the smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_iskcon_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Create a pending donation record in our database
    await Donation.create({
      userId: userId,
      amount: amount,
      currency: 'INR',
      receipt: order.receipt,
      razorpayOrderId: order.id,
      status: 'created',
    });

    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Verify the payment after completion
// @route   POST /api/donations/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is authentic, update the donation record in the database
      const donation = await Donation.findOne({ where: { razorpayOrderId: razorpay_order_id } });
      if (donation) {
        donation.status = 'successful';
        donation.razorpayPaymentId = razorpay_payment_id;
        await donation.save();
      }
      
      // You can redirect the user or send a success message
      // For an API, sending a success status is best.
      res.json({ success: true, message: 'Payment verified successfully.' });

    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- NEW FUNCTION ---
// @desc    Get donation history for the logged-in user
// @route   GET /api/donations/history
// @access  Private
const getDonationHistory = async (req, res) => {
  try {
    const donations = await Donation.findAll({
      where: { 
        userId: req.user.id,
        status: 'successful' // Only show successful donations
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getDonationHistory,
};
