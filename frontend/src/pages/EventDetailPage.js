// frontend/src/pages/EventDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, CircularProgress, Alert } from '@mui/material';
import eventService from '../services/eventService';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await eventService.getEventById(id);
        setEvent(response.data);
      } catch (err) {
        setError('Event not found or an error occurred.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Container>
        <Alert severity="error">{error || 'Event not found.'}</Alert>
        <Box textAlign="center" mt={2}>
            <Button component={RouterLink} to="/events" variant="contained">
                Back to Events
            </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Box
          component="img"
          src={event.image || 'https://placehold.co/1200x400/f0ad4e/333?text=Event+Details'}
          alt={event.title}
          sx={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
        />
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            {event.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Date: {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Location: {event.location}
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, fontSize: '1.1rem', lineHeight: 1.7 }}>
            {event.description}
          </Typography>
        </Box>
      </Paper>
      <Box textAlign="center" mt={4}>
        <Button component={RouterLink} to="/events" variant="contained" size="large">
          Back to All Events
        </Button>
      </Box>
    </Container>
  );
};

export default EventDetailPage;
