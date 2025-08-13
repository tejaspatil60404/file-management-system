// frontend/src/components/EventFormModal.js (Updated)

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EventFormModal = ({ open, handleClose, event, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date ? new Date(event.date).toISOString().slice(0, 16) : '');
      setLocation(event.location);
      setImage(event.image || '');
      setSelectedFile(null);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setImage('');
      setSelectedFile(null);
    }
  }, [event, open]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const eventData = { title, description, date, location, image, selectedFile };
    if (event) {
      eventData.id = event.id;
    }
    onSave(eventData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {event ? 'Edit Event' : 'Add New Event'}
        </Typography>
        <TextField margin="normal" fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField margin="normal" fullWidth label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField
          margin="normal"
          fullWidth
          label="Date and Time"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField margin="normal" fullWidth label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        
        <TextField margin="normal" fullWidth label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} helperText="Enter an image URL or upload a new file below."/>
        <Button variant="outlined" component="label" fullWidth sx={{ mt: 1 }}>
          Upload New Image
          <input type="file" hidden accept="image/*" onChange={handleFileChange} />
        </Button>
        {selectedFile && <Typography sx={{mt: 1, fontSize: '0.8rem'}}>Selected: {selectedFile.name}</Typography>}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventFormModal;