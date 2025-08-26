// File: /frontend/src/services/donationService.js (Updated)
// ==========================================================================
import api from './api';

const createOrder = (amount) => {
  return api.post('/donations/create-order', { amount });
};

const verifyPayment = (paymentData) => {
  return api.post('/donations/verify-payment', paymentData);
};

// --- NEW FUNCTION ---
const getDonationHistory = () => {
  return api.get('/donations/history');
};

const donationService = {
  createOrder,
  verifyPayment,
  getDonationHistory,
};

export default donationService;