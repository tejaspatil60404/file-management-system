// File: /frontend/src/pages/DonationsPage.js (New File)
// ==========================================================================
import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, CircularProgress, Alert } from '@mui/material';
import donationService from '../services/donationService';
import { useAuth } from '../context/authContext';

const DonationsPage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useAuth();

  const displayRazorpay = async (donationAmount) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Create Order on Backend
      const orderResponse = await donationService.createOrder(donationAmount);
      const order = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Get your key from .env
        amount: order.amount,
        currency: order.currency,
        name: 'ISKCON Temple Donation',
        description: 'Thank you for your contribution.',
        order_id: order.id,
        handler: async (response) => {
          // 2. Verify Payment on Backend
          try {
            await donationService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setSuccess('Donation successful! Thank you for your support.');
            setAmount('');
          } catch (verifyError) {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user.username,
          email: user.email,
        },
        theme: {
          color: '#f0ad4e',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      setError('Failed to create donation order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 0) {
      displayRazorpay(amount);
    } else {
      setError('Please enter a valid amount.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
        Make a Donation
      </Typography>
      <Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>Your Support Matters</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your generous contribution helps us continue our services and community programs.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          label="Donation Amount (INR)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
          InputProps={{ inputProps: { min: 1 } }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Donate Now'}
        </Button>
      </Paper>
    </Container>
  );
};

export default DonationsPage;