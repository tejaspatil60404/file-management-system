

// -------------------------------------------

// frontend/src/pages/EventDetailPage.js

import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';

// We use the same mock data here. In a real app, you'd fetch only the specific event by its ID.
const mockEvents = [
  {
    id: 1,
    name: 'Janmashtami Celebration 2025',
    date: '2025-08-26T18:00:00Z',
    description: 'Join us for the grand celebration of Lord Krishna\'s birth. The event will feature kirtan, abhishek, cultural performances, and a grand feast. This is a day of joyous festivities and deep spiritual significance for devotees worldwide. The temple will be beautifully decorated, and special arrangements will be made for all visitors.',
    image: 'https://placehold.co/1200x400/f0ad4e/333?text=Janmashtami+Celebration',
    location: 'Main Temple Hall',
  },
  {
    id: 2,
    name: 'Diwali Festival of Lights 2025',
    date: '2025-10-21T17:00:00Z',
    description: 'Celebrate the festival of lights with us. Enjoy a beautiful lamp display, special prayers, and delicious prasadam. Diwali symbolizes the spiritual "victory of light over darkness, good over evil, and knowledge over ignorance." We will have a special evening program for the entire family.',
    image: 'https://placehold.co/1200x400/f0ad4e/333?text=Diwali+Festival',
    location: 'Temple Courtyard',
  },
  {
    id: 3,
    name: 'Ratha Yatra Parade 2024',
    date: '2024-07-07T10:00:00Z',
    description: 'The annual Festival of Chariots parade. A vibrant and joyous procession through the city streets, featuring three large, decorated chariots carrying the deities of Lord Jagannath, Baladeva, and Subhadra. The parade will be accompanied by music, chanting, and dancing.',
    image: 'https://placehold.co/1200x400/f0ad4e/333?text=Ratha+Yatra',
    location: 'Starts at City Square',
  },
    {
    id: 4,
    name: 'Gaura Purnima 2024',
    date: '2024-03-24T18:30:00Z',
    description: 'Celebrating the appearance of Sri Chaitanya Mahaprabhu, who is revered as the combined avatar of Radha and Krishna. The evening includes a special lecture on the life and teachings of Lord Chaitanya, ecstatic kirtan, and a sumptuous feast for all attendees.',
    image: 'https://placehold.co/1200x400/f0ad4e/333?text=Gaura+Purnima',
    location: 'Main Temple Hall',
  },
];

const EventDetailPage = () => {
  const { id } = useParams(); // Gets the 'id' from the URL (e.g., /events/1)
  const event = mockEvents.find((e) => e.id === parseInt(id));

  if (!event) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 5 }}>
          Event not found.
        </Typography>
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
          src={event.image}
          alt={event.name}
          sx={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
        />
        <Box sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            {event.name}
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
