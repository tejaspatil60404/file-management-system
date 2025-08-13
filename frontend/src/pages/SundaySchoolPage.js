// frontend/src/pages/SundaySchoolPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardMedia, CircularProgress, Alert } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import sundaySchoolService from '../services/sundaySchoolService';

const SundaySchoolPage = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await sundaySchoolService.getSundaySchoolDetails();
        setDetails(response.data);
      } catch (err) {
        setError('Failed to load Sunday School details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !details) {
    return <Alert severity="error">{error || 'Could not load details.'}</Alert>;
  }
  
  // --- CORRECTED FIX: Safely parse the timetable string into an array ---
  let timetable = [];
  if (details && details.timetableJson) {
    // The backend getter should handle this, but we parse here as a safeguard.
    if (Array.isArray(details.timetableJson)) {
      timetable = details.timetableJson;
    } else if (typeof details.timetableJson === 'string') {
      try {
        timetable = JSON.parse(details.timetableJson);
      } catch (e) {
        console.error("Failed to parse timetable JSON:", e);
        timetable = []; // Default to empty array on parsing error
      }
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
        Sunday School Program
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 5 }}>
        Nurturing spiritual values in children through fun and engaging activities.
      </Typography>

      {/* Upcoming Event Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ borderBottom: '2px solid #f0ad4e', pb: 1, mb: 3 }}>
          <EventIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Upcoming Special Event
        </Typography>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', md: 400 } }}
            image={details.upcomingEventImage || 'https://placehold.co/1200x400/333/f0ad4e?text=Upcoming+Event'}
            alt={details.upcomingEventTitle}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left' }}>
              <Typography component="div" variant="h5" fontWeight="bold">
                {details.upcomingEventTitle}
              </Typography>
              {details.upcomingEventDate && (
                <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mb: 2 }}>
                  {new Date(details.upcomingEventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
              )}
              <Typography variant="body1">
                {details.upcomingEventDescription}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Box>

      {/* Timetable Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ borderBottom: '2px solid #f0ad4e', pb: 1, mb: 3 }}>
          <ScheduleIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Weekly Timetable
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: '#333' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Time</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetable.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.time}
                  </TableCell>
                  <TableCell>{row.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SundaySchoolPage;
