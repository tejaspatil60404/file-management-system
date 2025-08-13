// frontend/src/pages/AdminGalleriesPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Select, MenuItem, Button, FormControl, InputLabel, Grid, Card, CardMedia, CardActions, IconButton, CircularProgress, Alert } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import eventService from '../services/eventService';
import galleryService from '../services/galleryService';
import uploadService from '../services/uploadService';

const AdminGalleriesPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch all events to populate the dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getEvents();
        setEvents(response.data);
      } catch (err) {
        setError('Failed to fetch events.');
      }
    };
    fetchEvents();
  }, []);

  // Fetch gallery for the selected event
  const fetchGalleryForEvent = async (eventId) => {
    if (!eventId) {
      setGalleryItems([]);
      return;
    }
    try {
      setLoading(true);
      const response = await galleryService.getGalleryByEvent(eventId);
      setGalleryItems(response.data);
    } catch (err) {
      setError('Failed to fetch gallery for this event.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryForEvent(selectedEventId);
  }, [selectedEventId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedEventId) return;

    try {
      // Step 1: Upload the file
      const uploadRes = await uploadService.uploadFile(selectedFile);
      
      // Step 2: Create the gallery item record
      const galleryItemData = {
        url: uploadRes.data.filePath,
        type: selectedFile.type.startsWith('video') ? 'video' : 'image',
        eventId: selectedEventId,
        description: selectedFile.name,
      };
      await galleryService.addGalleryItem(galleryItemData);

      // Step 3: Refresh the gallery
      fetchGalleryForEvent(selectedEventId);
      setSelectedFile(null);
    } catch (err) {
      setError('File upload failed.');
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await galleryService.deleteGalleryItem(itemId);
        setGalleryItems(galleryItems.filter(item => item.id !== itemId));
      } catch (err) {
        setError('Failed to delete item.');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Galleries
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <FormControl fullWidth>
          <InputLabel id="event-select-label">Select an Event to Manage its Gallery</InputLabel>
          <Select
            labelId="event-select-label"
            value={selectedEventId}
            label="Select an Event to Manage its Gallery"
            onChange={(e) => setSelectedEventId(e.target.value)}
          >
            <MenuItem value=""><em>-- Select Event --</em></MenuItem>
            {events.map((event) => (
              <MenuItem key={event.id} value={event.id}>{event.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {selectedEventId && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>Upload New Media</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
              Choose File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {selectedFile && <Typography>{selectedFile.name}</Typography>}
            <Button variant="contained" onClick={handleUpload} disabled={!selectedFile}>
              Upload to Gallery
            </Button>
          </Box>
        </Paper>
      )}

      {loading ? <CircularProgress /> : (
        <Grid container spacing={2}>
          {galleryItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component={item.type === 'video' ? 'video' : 'img'}
                  height="160"
                  image={item.url}
                  alt={item.description}
                  controls={item.type === 'video'}
                />
                <CardActions sx={{ justifyContent: 'space-between' }}>
                   <Typography variant="caption" sx={{px: 1}}>{item.description}</Typography>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminGalleriesPage;
