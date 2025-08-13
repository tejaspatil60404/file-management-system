// frontend/src/pages/AdminUsersPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button, CircularProgress, Alert } from '@mui/material';
import userService from '../services/userService';
import sadhanaService from '../services/sadhanaService';
import AssignCounsellorModal from '../components/AssignCounsellorModal';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [counsellors, setCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [usersRes, counsellorsRes] = await Promise.all([
        userService.getUsers(),
        userService.getCounsellors()
      ]);

      setUsers(usersRes.data);
      setCounsellors(counsellorsRes.data);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch page data.';
      setError(errorMessage);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await userService.updateUserRole(userId, newRole);
      setUsers(users.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ));
      if (newRole === 'counsellor') {
          fetchData();
      }
    } catch (err) {
      setError('Failed to update user role.');
    }
  };

  const handleOpenAssignModal = (userToAssign) => {
    setSelectedUser(userToAssign);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
    setSelectedUser(null);
  };

  const handleAssignCounsellor = async (userId, counsellorId) => {
    try {
        await sadhanaService.assignCounsellor(userId, counsellorId);
        setSuccess('Counsellor assigned successfully!');
        handleCloseAssignModal();
        setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
        setError('Failed to assign counsellor.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Users
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && (
        <Box sx={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 1500, // high z-index for floating
          minWidth: 300
        }}>
          <Alert severity="success">{success}</Alert>
        </Box>
      )}

      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead sx={{ backgroundColor: '#333' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)} size="small">
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="counsellor">Counsellor</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    {user.role === 'user' && (
                      <Button variant="outlined" size="small" onClick={() => handleOpenAssignModal(user)}>
                        Assign Counsellor
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AssignCounsellorModal
        open={isAssignModalOpen}
        handleClose={handleCloseAssignModal}
        user={selectedUser}
        counsellors={counsellors}
        onAssign={handleAssignCounsellor}
      />
    </Container>
  );
};

export default AdminUsersPage;
