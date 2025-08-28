// frontend/src/pages/HomePage.js

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useScrollAnimation } from '../hooks/useScrollAnimation'; // Import the custom hook
import '../styles/HomePage.css'; // Import the new CSS

const upcomingEvents = [
  { id: 4, name: 'Janmashtami 2025', date: '2025-08-26', image: `http://192.168.43.159:5000/uploads/file-1755401079243.jpg` },
  { id: 5, name: 'Diwali Festival', date: '2025-10-21', image: `http://192.168.43.159:5000/uploads/file-1755401061152.webp` },
  { id: 3, name: 'Govardhan Puja', date: '2025-11-02', image: `http://192.168.43.159:5000/uploads/file-1755148789161.jpg` },
];
const galleryImages = [
  { img: `http://192.168.43.159:5000/uploads/file-1755401038882.jpg`, title: 'Kirtan' },
  { img: `http://192.168.43.159:5000/uploads/file-1755401031113.jpeg`, title: 'Deities' },
  { img: `http://192.168.43.159:5000/uploads/file-1755401017737.webp`, title: 'Prasadam' },
  { img: `http://192.168.43.159:5000/uploads/file-1755400996370.webp`, title: 'Festival' },
];
// --- End of Mock Data ---

const AnimatedSection = ({ children, animationClass }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  return (
    <div ref={ref} className={`section-hidden ${animationClass} ${isVisible ? 'section-visible' : ''}`}>
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: { xs: '70vh', md: '90vh' }, color: 'white', textAlign: 'center', position: 'relative', '&::before': { content: '""', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(https://placehold.co/1920x1080/000000/333?text=Temple+Background)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.4)', zIndex: -1, } }}>
        <Container maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' } // Responsive font size
            }}
          >
            Experience Divine Connection
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
              fontSize: { xs: '1rem', sm: '1.25rem' } // Responsive font size
            }}
          >
            Join our community for spiritual events, vibrant festivals, and daily worship.
          </Typography>
          <Button component={RouterLink} to="/events" variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ fontWeight: 'bold', py: 1.5, px: 4 }}>
            Explore Our Events
          </Button>
        </Container>
      </Box>

      {/* Upcoming Events Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <AnimatedSection animationClass="slide-in-left">
          <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">Upcoming Events</Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {upcomingEvents.map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={4}>
                <Card component={RouterLink} to={`/events/${event.id}`} sx={{ textDecoration: 'none', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6, } }}>
                  <CardMedia component="img" height="200" image={event.image} alt={event.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3" fontWeight="bold">{event.name}</Typography>
                    <Typography variant="body1" color="text.secondary">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AnimatedSection>
      </Container>

      {/* Our Mission Section */}
      <Box sx={{ bgcolor: 'grey.100', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <AnimatedSection animationClass="slide-in-right">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">Our Mission</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  Our mission is to promote the well-being of society by teaching the science of Krishna consciousness according to Bhagavad-gita and other timeless Vedic scriptures. We strive to create a vibrant community dedicated to spiritual growth and service.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box component="img" src={`http://192.168.43.159:5000/uploads/file-1755440367542.jpg`} alt="Our Mission" sx={{ width: '100%', borderRadius: '8px', boxShadow: 3 }} />
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Gallery Preview Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <AnimatedSection animationClass="fade-in">
          <Typography variant="h4" component="h2" align="center" gutterBottom fontWeight="bold">From Our Gallery</Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {galleryImages.map((item) => (
              <Grid item key={item.title} xs={6} sm={6} md={3}>
                <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: '8px', '&:hover img': { transform: 'scale(1.1)', } }}>
                  <Box component="img" src={item.img} alt={item.title} sx={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease', }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button component={RouterLink} to="/gallery" variant="outlined" size="large">View Full Gallery</Button>
          </Box>
        </AnimatedSection>
      </Container>
    </Box>
  );
};

export default HomePage;
