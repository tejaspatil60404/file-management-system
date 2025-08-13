// frontend/src/components/SadhanaRecordModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, CircularProgress, Alert } from '@mui/material';
import sadhanaService from '../services/sadhanaService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SadhanaRecordModal = ({ open, handleClose, user, onSave }) => {
  const [level, setLevel] = useState(1);
  const [notes, setNotes] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async (userId) => {
      try {
        setLoading(true);
        setError('');
        const response = await sadhanaService.getSadhanaRecordsForUser(userId);
        setRecords(response.data);
      } catch (err) {
        setError('Failed to fetch past records.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user && open) {
      fetchRecords(user.id);
    }
    setLevel(1);
    setNotes('');
  }, [user, open]);

  const handleSubmit = () => {
    const recordData = {
      userId: user.id,
      level,
      notes,
    };
    onSave(recordData);
    setRecords([{...recordData, recordDate: new Date().toISOString()}, ...records]);
  };

  if (!user) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Sadhana Records for {user.username}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Add New Record</Typography>
          <TextField margin="normal" fullWidth label="Level" type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
          <TextField margin="normal" fullWidth label="Notes" multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 1 }}>
            Save Record
          </Button>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="subtitle1">Past Records</Typography>
        {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
        {loading ? <CircularProgress /> : (
          <List sx={{ maxHeight: 200, overflow: 'auto' }}>
            {records.length > 0 ? records.map(record => (
              <ListItem key={record.id || Math.random()} disablePadding>
                <ListItemText
                  primary={`Level ${record.level}`}
                  secondary={`${new Date(record.recordDate).toLocaleDateString()} - ${record.notes}`}
                />
              </ListItem>
            )) : <Typography>No records found.</Typography>}
          </List>
        )}
        <Button onClick={handleClose} sx={{ mt: 3 }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default SadhanaRecordModal;
