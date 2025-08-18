// frontend/src/components/Footer.js

import React from 'react';
import { Box, Container, Grid, Link, Typography, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Import social media icons
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: 'white',
        py: 6,
        mt: 'auto', // Pushes footer to the bottom of the page
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ISKCON Temple
            </Typography>
            <Typography variant="body2" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>
              A spiritual oasis in the heart of the city, dedicated to the practice of Bhakti Yoga and the teachings of A.C. Bhaktivedanta Swami Prabhupada.
            </Typography>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/events" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>Events</Link>
            <Link component={RouterLink} to="/gallery" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>Gallery</Link>
            <Link component={RouterLink} to="/sunday-school" color="inherit" display="block" sx={{ mb: 1, textDecoration: 'none' }}>Sunday School</Link>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <IconButton aria-label="facebook" color="inherit" href="https://facebook.com" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="youtube" color="inherit" href="https://youtube.com" target="_blank">
              <YouTubeIcon />
            </IconButton>
            <IconButton aria-label="instagram" color="inherit" href="https://instagram.com" target="_blank">
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box mt={5}>
          <Typography variant="body2" align="center" sx={{color: 'rgba(255, 255, 255, 0.7)'}}>
            {'Copyright © '}
            <Link color="inherit" href="#">
              ISKCON Temple
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
