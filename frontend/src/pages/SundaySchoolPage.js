// frontend/src/pages/SundaySchoolPage.js

import React from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardMedia } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PaletteIcon from '@mui/icons-material/Palette';

// --- Mock Data for the Sunday School Page ---
const upcomingEvent = {
  name: 'Annual Children\'s Day Festival',
  date: '2025-11-14T10:00:00Z',
  description: 'A fun-filled day with dramas, kirtan, games, and a special feast for all the children. All are welcome to join and celebrate with us!',
  image: 'https://placehold.co/1200x400/333/f0ad4e?text=Children\'s+Day+Festival',
};

const timetable = [
  { time: '10:00 AM - 10:30 AM', activity: 'Welcome & Morning Prayers' },
  { time: '10:30 AM - 11:15 AM', activity: 'Storytelling from Scriptures' },
  { time: '11:15 AM - 12:00 PM', activity: 'Arts & Crafts Session' },
  { time: '12:00 PM - 12:30 PM', activity: 'Kirtan and Music' },
  { time: '12:30 PM - 01:00 PM', activity: 'Prasadam (Lunch)' },
];

const activities = [
    { name: 'Scriptural Stories', description: 'Engaging stories from the Ramayana, Mahabharata, and Puranas.', icon: <PaletteIcon /> },
    { name: 'Arts & Crafts', description: 'Creative activities like clay modeling, painting, and coloring.', icon: <PaletteIcon /> },
    { name: 'Music & Kirtan', description: 'Learning bhajans and playing musical instruments.', icon: <ScheduleIcon /> },
    { name: 'Drama & Skits', description: 'Performing plays based on the lives of great personalities.', icon: <EventIcon /> },
];
// --- End of Mock Data ---


const SundaySchoolPage = () => {
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
            image={upcomingEvent.image}
            alt={upcomingEvent.name}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', textAlign: 'left' }}>
              <Typography component="div" variant="h5" fontWeight="bold">
                {upcomingEvent.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ mb: 2 }}>
                {new Date(upcomingEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
              <Typography variant="body1">
                {upcomingEvent.description}
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
              {timetable.map((row) => (
                <TableRow
                  key={row.time}
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
