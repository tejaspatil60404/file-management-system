// frontend/src/pages/GalleryPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, ImageList, ImageListItem, ImageListItemBar, Box, CircularProgress, Alert, useTheme, useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import galleryService from '../services/galleryService';

const GalleryPage = () => {
  const [mediaByEvent, setMediaByEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // MUI hooks to determine screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await galleryService.getAllGalleryItems();
        
        const groupedMedia = response.data.reduce((acc, item) => {
          if (item.Event) {
            const year = new Date(item.Event.date).getFullYear();
            const key = `${item.Event.title} ${year}`;
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(item);
          }
          return acc;
        }, {});

        setMediaByEvent(groupedMedia);
      } catch (err) {
        setError('Failed to load gallery. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Determine the number of columns based on screen size
  const getCols = () => {
    if (isMobile) return 2;
    if (isTablet) return 3;
    return 4;
  };

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
        Event Gallery
      </Typography>

      {Object.keys(mediaByEvent).length === 0 ? (
        <Typography align="center" sx={{mt: 4}}>The gallery is currently empty.</Typography>
      ) : (
        Object.keys(mediaByEvent).map(eventKey => (
          <Box key={eventKey} sx={{ mb: 5 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2, borderBottom: '2px solid #f0ad4e' }}>
              {eventKey}
            </Typography>
            <ImageList variant="quilted" cols={getCols()} rowHeight={200} gap={8}>
              {mediaByEvent[eventKey].map((item) => (
                <ImageListItem key={item.id}>
                  <img
                    src={item.url}
                    alt={item.description}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <ImageListItemBar
                    title={item.description || 'Gallery Image'}
                    subtitle={item.type === 'video' ? 'Video' : 'Photo'}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.description}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        ))
      )}
    </Container>
  );
};

export default GalleryPage;
