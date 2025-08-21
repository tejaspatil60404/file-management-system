// ==========================================================================
// File: /frontend/src/services/donationService.js (New File)
// ==========================================================================
import api from './api';

// Create a donation order (protected route)
const createOrder = (amount) => {
  return api.post('/donations/create-order', { amount });
};

// Verify the payment (protected route)
const verifyPayment = (paymentData) => {
  return api.post('/donations/verify-payment', paymentData);
};

const donationService = {
  createOrder,
  verifyPayment,
};

export default donationService;