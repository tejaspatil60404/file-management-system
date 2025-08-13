// frontend/src/pages/EventsPage.js

import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, CircularProgress, Alert, Box } from '@mui/material';
import eventService from '../services/eventService';

const EventsPage = () => {
  const [eventsByYear, setEventsByYear] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await eventService.getEvents();
        
        // Group events by year
        const groupedEvents = response.data.reduce((acc, event) => {
          const year = new Date(event.date).getFullYear();
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(event);
          return acc;
        }, {});

        setEventsByYear(groupedEvents);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const sortedYears = Object.keys(eventsByYear).sort((a, b) => b - a);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
        Temple Events
      </Typography>
      
      {sortedYears.length === 0 ? (
        <Typography align="center" sx={{mt: 4}}>No events found.</Typography>
      ) : (
        sortedYears.map(year => (
          <div key={year}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2, borderBottom: '2px solid #f0ad4e' }}>
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
                        image={event.image || 'https://placehold.co/600x400/f0ad4e/333?text=Event'}
                        alt={event.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h3" fontWeight="bold">
                          {event.title}
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
        ))
      )}
    </Container>
  );
};

export default EventsPage;