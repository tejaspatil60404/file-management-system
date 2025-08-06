// frontend/src/pages/GalleryPage.js

import React from 'react';
import { Container, Typography, ImageList, ImageListItem, ImageListItemBar, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

// --- Mock Data for the Gallery ---
const galleryItems = [
  // Janmashtami 2025
  {
    img: 'https://placehold.co/400x300/f0ad4e/333?text=Krishna+Abhishek',
    title: 'Krishna Abhishek',
    event: 'Janmashtami Celebration',
    year: 2025,
  },
  {
    img: 'https://placehold.co/400x300/333/f0ad4e?text=Kirtan+Session',
    title: 'Kirtan Session',
    event: 'Janmashtami Celebration',
    year: 2025,
  },
  {
    // Example of a video - using a placeholder
    img: 'https://placehold.co/400x300/f0ad4e/333?text=Cultural+Dance+(Video)',
    title: 'Cultural Dance (Video)',
    event: 'Janmashtami Celebration',
    year: 2025,
    isVideo: true,
  },
  {
    img: 'https://placehold.co/400x300/333/f0ad4e?text=Prasadam+Distribution',
    title: 'Prasadam Distribution',
    event: 'Janmashtami Celebration',
    year: 2025,
  },
  // Ratha Yatra 2024
  {
    img: 'https://placehold.co/400x300/f0ad4e/333?text=Chariot+Procession',
    title: 'Chariot Procession',
    event: 'Ratha Yatra Parade',
    year: 2024,
  },
  {
    img: 'https://placehold.co/400x300/333/f0ad4e?text=Deities+on+Chariot',
    title: 'Deities on Chariot',
    event: 'Ratha Yatra Parade',
    year: 2024,
  },
  // Diwali 2025
  {
    img: 'https://placehold.co/400x300/f0ad4e/333?text=Lamp+Display',
    title: 'Lamp Display',
    event: 'Diwali Festival of Lights',
    year: 2025,
  },
  {
    img: 'https://placehold.co/400x300/333/f0ad4e?text=Temple+Decorations',
    title: 'Temple Decorations',
    event: 'Diwali Festival of Lights',
    year: 2025,
  },
];
// --- End of Mock Data ---

const GalleryPage = () => {
  // Group media by event and year
  const mediaByEvent = galleryItems.reduce((acc, item) => {
    const key = `${item.event} ${item.year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
        Event Gallery
      </Typography>

      {Object.keys(mediaByEvent).map(eventKey => (
        <Box key={eventKey} sx={{ mb: 5 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4, mb: 2, borderBottom: '2px solid #f0ad4e' }}>
            {eventKey}
          </Typography>
          <ImageList variant="quilted" cols={4} rowHeight={200} gap={8}>
            {mediaByEvent[eventKey].map((item, index) => (
              <ImageListItem key={item.img} cols={index % 5 === 0 ? 2 : 1} rows={index % 5 === 0 ? 2 : 1}>
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.isVideo ? 'Video' : 'Photo'}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ))}
    </Container>
  );
};

export default GalleryPage;
