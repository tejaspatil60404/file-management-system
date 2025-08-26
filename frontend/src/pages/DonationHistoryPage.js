// File: /frontend/src/pages/DonationHistoryPage.js (New File)
// ==========================================================================
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Alert } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import donationService from '../services/donationService';

const DonationHistoryPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await donationService.getDonationHistory();
        setDonations(response.data);
      } catch (err) {
        setError('Failed to fetch donation history.');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleDownloadReceipt = (donation) => {
    const receiptContent = `
      <html>
        <head>
          <title>Donation Receipt - ${donation.receipt}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            .receipt-container { border: 1px solid #ccc; padding: 20px; max-width: 600px; margin: auto; }
            h1 { text-align: center; }
            p { line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <h1>Donation Receipt</h1>
            <p><strong>Receipt Number:</strong> ${donation.receipt}</p>
            <p><strong>Date:</strong> ${new Date(donation.createdAt).toLocaleDateString()}</p>
            <p><strong>Amount:</strong> ${donation.amount} ${donation.currency}</p>
            <p><strong>Payment ID:</strong> ${donation.razorpayPaymentId}</p>
            <hr/>
            <p>Thank you for your generous contribution to ISKCON Temple.</p>
          </div>
        </body>
      </html>
    `;
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(receiptContent);
    receiptWindow.document.close();
    receiptWindow.print();
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        My Donation History
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#333' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Receipt No.</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{donation.amount} {donation.currency}</TableCell>
                  <TableCell>{donation.receipt}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownloadReceipt(donation)}
                    >
                      Receipt
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">You have not made any donations yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DonationHistoryPage;