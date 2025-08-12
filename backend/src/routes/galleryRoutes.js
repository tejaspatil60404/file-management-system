// backend/src/routes/galleryRoutes.js

const express = require('express');
const router = express.Router();
const {
  getGalleryByEvent,
  addGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to get media for an event
router.get('/event/:eventId', getGalleryByEvent);

// Admin-only routes
router.post('/', protect, admin, addGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router;
