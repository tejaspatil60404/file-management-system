// frontend/src/services/eventService.js

import axios from 'axios';

const API_URL = '/api/events/';

// Helper function to get the auth token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Create an axios instance with auth headers
const axiosWithAuth = () => {
  const token = getToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Get all events (public)
const getEvents = () => {
  return axios.get(API_URL);
};

// Create a new event (admin only)
const createEvent = (eventData) => {
  return axiosWithAuth().post('/', eventData);
};

// Update an event (admin only)
const updateEvent = (id, eventData) => {
  return axiosWithAuth().put(`/${id}`, eventData);
};

// Delete an event (admin only)
const deleteEvent = (id) => {
  return axiosWithAuth().delete(`/${id}`);
};

const eventService = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default eventService;
