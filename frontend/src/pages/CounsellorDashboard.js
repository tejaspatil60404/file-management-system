// frontend/src/pages/CounsellorDashboard.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Alert } from '@mui/material';
import sadhanaService from '../services/sadhanaService';
import { useAuth } from '../context/authContext';
import SadhanaRecordModal from '../components/SadhanaRecordModal';

const CounsellorDashboard = () => {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchAssignedUsers = async () => {
    try {
      setLoading(true);
      const response = await sadhanaService.getAssignedUsers();
      const users = response.data.map(assignment => assignment.Counselee);
      setAssignedUsers(users);
    } catch (err) {
      setError('Failed to fetch assigned users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && (user.role === 'counsellor' || user.role === 'admin')) {
      fetchAssignedUsers();
    }
  }, [user]);

  const handleOpenModal = (userToManage) => {
    setSelectedUser(userToManage);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveRecord = async (recordData) => {
    try {
      await sadhanaService.addSadhanaRecord(recordData);
      // You could show a success message here
      handleCloseModal();
    } catch (err) {
      // You could show an error message in the modal
      console.error("Failed to save record", err);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Counsellor Dashboard
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        My Assigned Users
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="assigned users table">
          <TableHead sx={{ backgroundColor: '#333' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedUsers.length > 0 ? (
              assignedUsers.map((assignedUser) => (
                <TableRow key={assignedUser.id}>
                  <TableCell>{assignedUser.username}</TableCell>
                  <TableCell>{assignedUser.email}</TableCell>
                  <TableCell align="right">
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => handleOpenModal(assignedUser)}
                    >
                      Manage Records
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  You have no users assigned to you.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <SadhanaRecordModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        user={selectedUser}
        onSave={handleSaveRecord}
      />
    </Container>
  );
};

export default CounsellorDashboard;