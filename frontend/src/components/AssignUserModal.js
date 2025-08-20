// frontend/src/components/AssignUserModal.js (Updated: Simplified to only assign)

import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Autocomplete, TextField, Alert } from '@mui/material';
import userService from '../services/userService';

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

const AssignUserModal = ({ open, handleClose, onAssign }) => {
  const [unassignedUsers, setUnassignedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      const fetchUsers = async () => {
        try {
          setError('');
          const res = await userService.getUnassignedUsers();
          setUnassignedUsers(res.data);
        } catch (err) {
          setError('Failed to fetch unassigned users.');
        }
      };
      fetchUsers();
    }
  }, [open]);

  const handleAssign = () => {
    if (selectedUser) {
      onAssign(selectedUser.id);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setError('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Assign Existing User
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Autocomplete
          options={unassignedUsers}
          getOptionLabel={(option) => `${option.username} (${option.email})`}
          onChange={(event, newValue) => {
            setSelectedUser(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Search Unassigned Users" />}
        />
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={handleAssign} variant="contained" disabled={!selectedUser}>Assign</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AssignUserModal;