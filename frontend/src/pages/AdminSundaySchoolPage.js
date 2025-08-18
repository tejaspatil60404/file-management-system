// frontend/src/pages/AdminSundaySchoolPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, TextField, Button, CircularProgress, Alert, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import sundaySchoolService from '../services/sundaySchoolService';

const AdminSundaySchoolPage = () => {
  const [details, setDetails] = useState({
    upcomingEventTitle: '',
    upcomingEventDescription: '',
    upcomingEventDate: '',
    upcomingEventImage: '',
  });
  const [timetable, setTimetable] = useState([{ time: '', activity: '' }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await sundaySchoolService.getSundaySchoolDetails();
        const data = response.data;
        
        const formattedDate = data.upcomingEventDate 
          ? new Date(data.upcomingEventDate).toISOString().slice(0, 16) 
          : '';
        
        setDetails({ 
            upcomingEventTitle: data.upcomingEventTitle,
            upcomingEventDescription: data.upcomingEventDescription,
            upcomingEventDate: formattedDate,
            upcomingEventImage: data.upcomingEventImage,
        });

        // Safely parse and set the timetable
        const parsedTimetable = Array.isArray(data.timetableJson) && data.timetableJson.length > 0
            ? data.timetableJson
            : [{ time: '', activity: '' }]; // Default to one empty row
        setTimetable(parsedTimetable);

      } catch (err) {
        setError('Failed to load details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleTimetableChange = (index, event) => {
    const newTimetable = [...timetable];
    newTimetable[index][event.target.name] = event.target.value;
    setTimetable(newTimetable);
  };

  const addTimetableRow = () => {
    setTimetable([...timetable, { time: '', activity: '' }]);
  };

  const removeTimetableRow = (index) => {
    const newTimetable = [...timetable];
    newTimetable.splice(index, 1);
    setTimetable(newTimetable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Create the final payload with the timetable converted to a JSON string
      const payload = {
        ...details,
        timetableJson: JSON.stringify(timetable),
      };
      await sundaySchoolService.updateSundaySchoolDetails(payload);
      setSuccess('Sunday School details updated successfully!');
    } catch (err) {
      setError('Failed to update details.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Sunday School Program
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Upcoming Event Details</Typography>
        <TextField name="upcomingEventTitle" label="Event Title" value={details.upcomingEventTitle} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="upcomingEventDescription" label="Event Description" value={details.upcomingEventDescription} onChange={handleChange} fullWidth multiline rows={4} margin="normal" />
        <TextField name="upcomingEventDate" label="Event Date" type="datetime-local" value={details.upcomingEventDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField name="upcomingEventImage" label="Event Image URL" value={details.upcomingEventImage} onChange={handleChange} fullWidth margin="normal" />

        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Weekly Timetable</Typography>
        
        {timetable.map((row, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField name="time" label="Time" value={row.time} onChange={(e) => handleTimetableChange(index, e)} sx={{ flex: 1 }} />
            <TextField name="activity" label="Activity" value={row.activity} onChange={(e) => handleTimetableChange(index, e)} sx={{ flex: 2 }} />
            <IconButton onClick={() => removeTimetableRow(index)} color="error">
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}
        
        <Button startIcon={<AddCircleOutlineIcon />} onClick={addTimetableRow} sx={{ mt: 1 }}>
          Add Row
        </Button>

        <Button type="submit" variant="contained" size="large" sx={{ mt: 3, display: 'block' }}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default AdminSundaySchoolPage;
