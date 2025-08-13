// frontend/src/services/galleryService.js

import api from './api';

// --- Public Routes ---

// Get ALL gallery items
const getAllGalleryItems = () => {
  return api.get('/gallery/all');
};

// Get all gallery items for a specific event
const getGalleryByEvent = (eventId) => {
  return api.get(`/gallery/event/${eventId}`);
};

// --- Admin Routes ---

// Add a new item to the gallery
const addGalleryItem = (itemData) => {
  return api.post('/gallery', itemData);
};

// Delete a gallery item
const deleteGalleryItem = (id) => {
  return api.delete(`/gallery/${id}`);
};

const galleryService = {
  getAllGalleryItems,
  getGalleryByEvent,
  addGalleryItem,
  deleteGalleryItem,
};

export default galleryService;
