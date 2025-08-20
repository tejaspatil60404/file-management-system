// frontend/src/pages/CounsellorDashboard.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import sadhanaService from '../services/sadhanaService';
import authService from '../services/authService'; // We need this for registration
import { useAuth } from '../context/authContext';
import SadhanaRecordModal from '../components/SadhanaRecordModal';
import AssignUserModal from '../components/AssignUserModal';

// frontend/src/pages/CounsellorDashboard.js (Updated)

const CounsellorDashboard = () => {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchAssignedUsers = async () => {
    try {
      setLoading(true);
      setError('');
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

  const handleOpenRecordModal = (userToManage) => {
    setSelectedUser(userToManage);
    setIsRecordModalOpen(true);
  };

  const handleCloseRecordModal = () => {
    setIsRecordModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveRecord = async (recordData) => {
    try {
      await sadhanaService.addSadhanaRecord(recordData);
      handleCloseRecordModal();
    } catch (err) {
      console.error("Failed to save record", err);
    }
  };

  const handleAssignUser = async (userIdToAssign) => {
    try {
      // Use the new, correct service function
      await sadhanaService.assignUserToSelf(userIdToAssign);
      setIsAssignModalOpen(false);
      fetchAssignedUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to assign user.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Counsellor Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAssignModalOpen(true)}
        >
          Assign User
        </Button>
      </Box>

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
                      onClick={() => handleOpenRecordModal(assignedUser)}
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
        open={isRecordModalOpen}
        handleClose={handleCloseRecordModal}
        user={selectedUser}
        onSave={handleSaveRecord}
      />

      <AssignUserModal
        open={isAssignModalOpen}
        handleClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignUser}
      />
    </Container>
  );
};

export default CounsellorDashboard;