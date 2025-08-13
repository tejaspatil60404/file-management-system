// frontend/src/services/eventService.js
import api from './api';

// --- Public Routes ---
const getEvents = () => {
  return api.get('/events');
};

const getEventById = (id) => {
  return api.get(`/events/${id}`);
};

// --- Admin Routes ---
const createEvent = (eventData) => {
  return api.post('/events', eventData);
};

const updateEvent = (id, eventData) => {
  return api.put(`/events/${id}`, eventData);
};

const deleteEvent = (id) => {
  return api.delete(`/events/${id}`);
};

const eventService = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default eventService;