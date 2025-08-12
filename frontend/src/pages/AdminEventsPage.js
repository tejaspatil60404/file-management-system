// frontend/src/pages/AdminEventsPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import eventService from '../services/eventService';
import EventFormModal from '../components/EventFormModal';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null); // For editing

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      setEvents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event = null) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleSaveEvent = async (eventData) => {
    // This is where the upload logic will go in Phase 4.
    // For now, we just log the file to the console if it exists.
    if (eventData.selectedFile) {
      console.log('File to upload:', eventData.selectedFile);
      // In the future, you'll upload the file here and get back a URL.
      // Then you'll save that URL in eventData.image before saving the event.
    }
    
    try {
      // We remove the temporary 'selectedFile' before sending to backend
      const { selectedFile, ...dataToSave } = eventData;

      if (dataToSave.id) {
        await eventService.updateEvent(dataToSave.id, dataToSave);
      } else {
        await eventService.createEvent(dataToSave);
      }
      fetchEvents();
      handleCloseModal();
    } catch (err) {
      setError('Failed to save event.');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        fetchEvents();
      } catch (err) {
        setError('Failed to delete event.');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Manage Events
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Add New Event
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="events table">
            <TableHead sx={{ backgroundColor: '#333' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleString()}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(event)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteEvent(event.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <EventFormModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        event={currentEvent}
        onSave={handleSaveEvent}
      />
    </Container>
  );
};

export default AdminEventsPage;
