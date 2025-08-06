// frontend/src/pages/EventsPage.js

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

// --- Mock Data (This will be replaced by an API call later) ---
const mockEvents = [
  {
    id: 1,
    name: 'Janmashtami Celebration 2025',
    date: '2025-08-26T18:00:00Z',
    description: 'Join us for the grand celebration of Lord Krishna\'s birth. The event will feature kirtan, abhishek, cultural performances, and a grand feast.',
    image: 'https://placehold.co/600x400/f0ad4e/333?text=Janmashtami',
  },
  {
    id: 2,
    name: 'Diwali Festival of Lights 2025',
    date: '2025-10-21T17:00:00Z',
    description: 'Celebrate the festival of lights with us. Enjoy a beautiful lamp display, special prayers, and delicious prasadam.',
    image: 'https://placehold.co/600x400/f0ad4e/333?text=Diwali',
  },
  {
    id: 3,
    name: 'Ratha Yatra Parade 2024',
    date: '2024-07-07T10:00:00Z',
    description: 'The annual Festival of Chariots parade. A vibrant and joyous procession through the city streets.',
    image: 'https://placehold.co/600x400/f0ad4e/333?text=Ratha+Yatra',
  },
    {
    id: 4,
    name: 'Gaura Purnima 2024',
    date: '2024-03-24T18:30:00Z',
    description: 'Celebrating the appearance of Sri Chaitanya Mahaprabhu. The evening includes a special lecture, kirtan, and a feast.',
    image: 'https://placehold.co/600x400/f0ad4e/333?text=Gaura+Purnima',
  },
];
// --- End of Mock Data ---


const EventsPage = () => {
  // A simple way to group events by year for display
  const eventsByYear = mockEvents.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(event);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
        Temple Events
      </Typography>
      
      {sortedYears.map(year => (
        <div key={year}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2, borderBottom: '2px solid #000000ff' }}>
            {year}
          </Typography>
          <Grid container spacing={4}>
            {eventsByYear[year].map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  } 
                }}>
                  <CardActionArea component={RouterLink} to={`/events/${event.id}`}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={event.image}
                      alt={event.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h3" fontWeight="bold">
                        {event.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        {event.description.substring(0, 75)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

export default EventsPage;