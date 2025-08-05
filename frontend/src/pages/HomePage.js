// frontend/src/pages/HomePage.js (MUI Version)

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI Imports
import { Box, Button, Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 128px)', // Full viewport height minus navbar and padding
        textAlign: 'center',
        px: 2, // Horizontal padding
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main', // Uses the primary theme color
          }}
        >
          Welcome to the ISKCON Temple Portal
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary" // A softer, secondary text color
          sx={{ mb: 4 }} // Margin bottom of 4 units (32px)
        >
          Discover upcoming events, explore our vibrant galleries, and connect with our community.
        </Typography>
        <Button
          component={RouterLink}
          to="/events"
          variant="contained"
          size="large"
          sx={{
            fontWeight: 'bold',
            py: 1.5, // Vertical padding
            px: 4,   // Horizontal padding
          }}
        >
          Explore Events
        </Button>
      </Container>
    </Box>
  );
};

export default HomePage;
