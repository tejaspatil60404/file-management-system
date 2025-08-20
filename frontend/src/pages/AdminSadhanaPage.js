// frontend/src/pages/AdminSadhanaPage.js (Advanced Version)

import React, { useState, useEffect, useMemo } from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Paper, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButtonGroup, ToggleButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import sadhanaService from '../services/sadhanaService';

// Helper function to get the start of the week for a given date
const getStartOfWeek = (date) => {
  const dt = new Date(date);
  const day = dt.getDay();
  const diff = dt.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(dt.setDate(diff)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const AdminSadhanaPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [groupBy, setGroupBy] = useState('user'); // 'user', 'month', 'week', 'day'

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

  // useMemo will re-calculate the data only when assignments or groupBy changes.
  const counsellorGroups = useMemo(() => {
    if (!assignments) return {};

    // 1. Group by Counsellor first
    return assignments.reduce((acc, assignment) => {
      if (assignment.Counsellor && assignment.Counselee) {
        const counsellorName = assignment.Counsellor.username;
        if (!acc[counsellorName]) {
          acc[counsellorName] = { users: [], records: [] };
        }
        acc[counsellorName].users.push(assignment.Counselee);
        if (assignment.Counselee.SadhanaEntries) {
            assignment.Counselee.SadhanaEntries.forEach(record => {
                acc[counsellorName].records.push({ ...record, user: assignment.Counselee });
            });
        }
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
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
        Sadhana Program Overview
      </Typography>

      {/* Grouping Controls */}
      <Paper sx={{ p: 2, mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography variant="subtitle2" sx={{mr: 2}}>Group By:</Typography>
        <ToggleButtonGroup value={groupBy} exclusive onChange={(e, newGroup) => newGroup && setGroupBy(newGroup)} aria-label="Group by">
          <ToggleButton value="user" aria-label="group by user">User</ToggleButton>
          <ToggleButton value="month" aria-label="group by month">Month</ToggleButton>
          <ToggleButton value="week" aria-label="group by week">Week</ToggleButton>
          <ToggleButton value="day" aria-label="group by day">Day</ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {Object.keys(counsellorGroups).length === 0 ? (
        <Typography>No users are currently assigned to any counsellors.</Typography>
      ) : (
        Object.keys(counsellorGroups).map(counsellorName => {
          const group = counsellorGroups[counsellorName];
          let groupedRecords = {};

          if (groupBy !== 'user') {
            groupedRecords = group.records.reduce((acc, record) => {
              let key;
              if (groupBy === 'month') key = new Date(record.recordDate).toLocaleString('default', { month: 'long', year: 'numeric' });
              if (groupBy === 'week') key = `Week of ${getStartOfWeek(record.recordDate)}`;
              if (groupBy === 'day') key = new Date(record.recordDate).toLocaleDateString();
              
              if (!acc[key]) acc[key] = [];
              acc[key].push(record);
              return acc;
            }, {});
          }

          return (
            <Accordion key={counsellorName} sx={{ mb: 2 }} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Counsellor: {counsellorName}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {groupBy === 'user' ? (
                  // Render grouped by user
                  group.users.map(user => (
                    <Paper key={user.id} variant="outlined" sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">{user.username} ({user.email})</Typography>
                      <TableContainer sx={{ mt: 1 }}>
                        <Table size="small">
                          <TableHead><TableRow><TableCell>Date</TableCell><TableCell>Level</TableCell><TableCell>Notes</TableCell></TableRow></TableHead>
                          <TableBody>
                            {user.SadhanaEntries && user.SadhanaEntries.length > 0 ? (
                              user.SadhanaEntries.map((record, index) => (
                                <TableRow key={index}><TableCell>{new Date(record.recordDate).toLocaleDateString()}</TableCell><TableCell>{record.level}</TableCell><TableCell>{record.notes}</TableCell></TableRow>
                              ))
                            ) : (<TableRow><TableCell colSpan={3} align="center">No records found.</TableCell></TableRow>)}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  ))
                ) : (
                  // Render grouped by time
                  Object.keys(groupedRecords).map(timeKey => (
                    <Box key={timeKey} sx={{mb: 2}}>
                       <Typography variant="subtitle1" fontWeight="bold">{timeKey}</Typography>
                       <List dense>
                          {groupedRecords[timeKey].map((record, idx) => (
                             <ListItem key={idx}>
                               <ListItemText primary={`${record.user.username} - Level ${record.level}`} secondary={record.notes} />
                             </ListItem>
                          ))}
                       </List>
                       <Divider />
                    </Box>
                  ))
                )}
              </AccordionDetails>
            </Accordion>
          )
        })
      )}
    </Container>
  );
};

export default AdminSadhanaPage;
