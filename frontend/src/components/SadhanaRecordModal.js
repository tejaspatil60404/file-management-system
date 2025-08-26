// frontend/src/components/SadhanaRecordModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, CircularProgress, Alert, Grid } from '@mui/material';
import sadhanaService from '../services/sadhanaService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const SadhanaRecordModal = ({ open, handleClose, user, onSaveSuccess }) => {
  // State for the form
  const [level, setLevel] = useState(1);
  const [chantingRounds, setChantingRounds] = useState(0);
  const [readingInMinutes, setReadingInMinutes] = useState('');
  const [shravan, setShravan] = useState('');
  const [seva, setSeva] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // State for displaying past records
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
      } finally {
        setLoading(false);
      }
    };

    if (user && open) {
      fetchRecords(user.id);
    }
    // Reset form when modal opens
    setLevel(1);
    setChantingRounds(0);
    setReadingInMinutes('');
    setShravan('');
    setSeva('');
    setRemarks('');
  }, [user, open]);

  const handleSubmit = async () => {
    try {
      const recordData = {
        userId: user.id,
        level,
        chantingRounds,
        readingInMinutes: Number(readingInMinutes) || 0,
        shravan,
        seva,
        remarks,
      };
      await sadhanaService.addSadhanaRecord(recordData);
      onSaveSuccess();
    } catch (err) {
      setError('Failed to save the record.');
    }
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField margin="normal" fullWidth label="Level" type="number" value={level} onChange={(e) => setLevel(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField margin="normal" fullWidth label="Chanting Rounds" type="number" value={chantingRounds} onChange={(e) => setChantingRounds(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField margin="normal" fullWidth label="Reading (Minutes)" type="number" value={readingInMinutes} onChange={(e) => setReadingInMinutes(e.target.value)} />
            </Grid>
             <Grid item xs={12} sm={4}>
              <TextField margin="normal" fullWidth label="Shravan (Hearing)" value={shravan} onChange={(e) => setShravan(e.target.value)} />
            </Grid>
             <Grid item xs={12} sm={4}>
              <TextField margin="normal" fullWidth label="Seva (Service)" value={seva} onChange={(e) => setSeva(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField margin="normal" fullWidth label="Remarks" multiline rows={2} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </Grid>
          </Grid>
          <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
            Save Record
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1">Past Records</Typography>
        {error && <Alert severity="error" sx={{ my: 1 }}>{error}</Alert>}
        {loading ? <CircularProgress /> : (
          <Paper sx={{ maxHeight: 250, overflow: 'auto', mt: 1 }}>
            <TableContainer>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Date</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Rounds</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>Reading (min)</TableCell>
                    <TableCell>Shravan</TableCell>
                    <TableCell>Seva</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.length > 0 ? records.map(record => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.recordDate).toLocaleDateString()}</TableCell>
                      <TableCell>{record.level}</TableCell>
                      <TableCell>{record.chantingRounds}</TableCell>
                      <TableCell>{record.readingInMinutes}</TableCell>
                      <TableCell>{record.shravan}</TableCell>
                      <TableCell>{record.seva}</TableCell>
                      <TableCell>{record.remarks}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">No records found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        <Button onClick={handleClose} sx={{ mt: 3 }}>Close</Button>
      </Box>
    </Modal>
  );
};

export default SadhanaRecordModal;
