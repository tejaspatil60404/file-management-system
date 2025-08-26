// File: /frontend/src/pages/AdminSadhanaPage.js (Updated)
// ==========================================================================
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Paper, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import sadhanaService from '../services/sadhanaService';

const AdminSadhanaPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllAssignments = async () => {
      try {
        setLoading(true);
        const response = await sadhanaService.getAllAssignments();
        setAssignments(response.data);
      } catch (err) {
        setError('Failed to fetch Sadhana program data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAllAssignments();
  }, []);

  const counsellorGroups = useMemo(() => {
    if (!assignments) return {};
    return assignments.reduce((acc, assignment) => {
      if (assignment.Counsellor && assignment.Counselee) {
        const counsellorName = assignment.Counsellor.username;
        if (!acc[counsellorName]) {
          acc[counsellorName] = [];
        }
        acc[counsellorName].push(assignment.Counselee);
      }
      return acc;
    }, {});
  }, [assignments]);

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
          <Accordion key={counsellorName} sx={{ mb: 2 }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Counsellor: {counsellorName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {counsellorGroups[counsellorName].map(user => (
                <Paper key={user.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">{user.username} ({user.email})</Typography>
                  
                  <TableContainer sx={{ mt: 1 }}>
                    <Table size="small" aria-label="sadhana records">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{fontWeight: 'bold'}}>Date</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}>Level</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}>Chanting</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}>Reading</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}>Shravan</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}>Seva</TableCell>
                          <TableCell sx={{fontWeight: 'bold'}}>Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user.SadhanaEntries && user.SadhanaEntries.length > 0 ? (
                          user.SadhanaEntries.map((record, index) => (
                            <TableRow key={index}>
                              <TableCell>{new Date(record.recordDate).toLocaleDateString()}</TableCell>
                              <TableCell>{record.level}</TableCell>
                              <TableCell>{record.chantingRounds} rounds</TableCell>
                              <TableCell>{record.readingInMinutes} mins</TableCell>
                              <TableCell>{record.shravan}</TableCell>
                              <TableCell>{record.seva}</TableCell>
                              <TableCell>{record.remarks}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              No records found for this user.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default AdminSadhanaPage;
