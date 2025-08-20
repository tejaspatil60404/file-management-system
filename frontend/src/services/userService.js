// frontend/src/services/userService.js

import api from './api';

// Get all users (admin only)
const getUsers = () => {
  return api.get('/users');
};

// Get all users with the role of 'counsellor' (admin only)
const getCounsellors = () => {
  return api.get('/users/counsellors');
};

// Update a user's role (admin only)
const updateUserRole = (id, role) => {
  return api.put(`/users/${id}/role`, { role });
};

const getUnassignedUsers = () => {
  return api.get('/users/unassigned');
};

const userService = {
  getUsers,
  getCounsellors,
  updateUserRole,
  getUnassignedUsers, // <-- Add this
};

export default userService;
