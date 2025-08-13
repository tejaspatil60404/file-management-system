// frontend/src/components/AssignCounsellorModal.js

import React, { useState } from 'react';
import { Modal, Box, Typography, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

// Style for the modal
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

const AssignCounsellorModal = ({ open, handleClose, user, counsellors, onAssign }) => {
  const [selectedCounsellorId, setSelectedCounsellorId] = useState('');

  const handleSave = () => {
    if (selectedCounsellorId) {
      onAssign(user.id, selectedCounsellorId);
    }
  };
  
  if (!user) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Assign Counsellor for {user.username}
        </Typography>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="counsellor-select-label">Select Counsellor</InputLabel>
          <Select
            labelId="counsellor-select-label"
            value={selectedCounsellorId}
            label="Select Counsellor"
            onChange={(e) => setSelectedCounsellorId(e.target.value)}
          >
            {counsellors.map((counsellor) => (
              <MenuItem key={counsellor.id} value={counsellor.id}>
                {counsellor.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Assign</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignCounsellorModal;
