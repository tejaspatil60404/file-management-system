// frontend/src/pages/AdminSadhanaPage.js (New File)

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import sadhanaService from '../services/sadhanaService';

const AdminSadhanaPage = () => {
  const [counsellorGroups, setCounsellorGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        setLoading(true);
        const response = await sadhanaService.getAllAssignments();
        
        // Group the assignments by counsellor
        const grouped = response.data.reduce((acc, assignment) => {
          const counsellorName = assignment.Counsellor.username;
          if (!acc[counsellorName]) {
            acc[counsellorName] = [];
          }
          acc[counsellorName].push(assignment.Counselee);
          return acc;
        }, {});

        setCounsellorGroups(grouped);
      } catch (err) {
        setError('Failed to fetch Sadhana program data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllAssignments();
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Sadhana Program Overview
      </Typography>

      {Object.keys(counsellorGroups).length === 0 ? (
        <Typography>No users are currently assigned to any counsellors.</Typography>
      ) : (
        Object.keys(counsellorGroups).map(counsellorName => (
          <Accordion key={counsellorName} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{counsellorName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {counsellorGroups[counsellorName].map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default AdminSadhanaPage;