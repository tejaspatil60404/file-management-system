// frontend/src/services/authService.js

import api from './api'; // <-- Use the central api instance

// Register user
const register = (username, email, password) => {
  return api.post('/auth/register', {
    username,
    email,
    password,
  });
};

// Login user
const login = (email, password) => {
  return api.post('/auth/login', {
    email,
    password,
  });
};

// Logout function remains the same
const logout = () => {
  localStorage.removeItem('user');
};


const authService = {
  register,
  login,
  logout,
};

export default authService;