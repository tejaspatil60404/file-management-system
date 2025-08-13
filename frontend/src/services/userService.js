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


const userService = {
  getUsers,
  getCounsellors,
  updateUserRole,
};

export default userService;
