// frontend/src/services/authService.js

import axios from 'axios';

// The base URL for our backend API
// The '/api/auth' part matches the prefix we set in our backend's server.js
const API_URL = '/api/auth/';

// Register user
const register = (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

// Login user
const login = (email, password) => {
  return axios.post(API_URL + 'login', {
    email,
    password,
  });
};

// We can add a logout function here later
const logout = () => {
  // For JWT auth, logout is handled on the client by removing the token
  localStorage.removeItem('user');
};


const authService = {
  register,
  login,
  logout,
};

export default authService;
