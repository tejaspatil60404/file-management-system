// frontend/src/pages/AdminUsersPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Button } from '@mui/material';

// --- Mock Data (This will be replaced by an API call later) ---
const mockUsers = [
  { id: 1, username: 'admin_user', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'counsellor_jane', email: 'jane@example.com', role: 'counsellor' },
  { id: 3, username: 'user_john', email: 'john@example.com', role: 'user' },
  { id: 4, username: 'user_doe', email: 'doe@example.com', role: 'user' },
];
// --- End of Mock Data ---

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // In the future, you'll fetch users from your API here.
    // For now, we use the mock data.
    setUsers(mockUsers);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    // This is where you'll call the API to update the user's role.
    // For now, we just update the local state to see the change in the UI.
    console.log(`Changing user ${userId} role to ${newRole}`);
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Users
      </Typography>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
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
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="counsellor">Counsellor</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small">
                    Assign Counsellor
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUsersPage;
