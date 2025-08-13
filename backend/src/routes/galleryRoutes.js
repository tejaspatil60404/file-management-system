// backend/src/routes/galleryRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllGalleryItems,
  getGalleryByEvent,
  addGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/all', getAllGalleryItems);
router.get('/event/:eventId', getGalleryByEvent);

// Admin-only routes
router.post('/', protect, admin, addGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router;
