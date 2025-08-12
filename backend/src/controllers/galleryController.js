// backend/src/controllers/galleryController.js

const GalleryItem = require('../models/galleryItemModel');
const Event = require('../models/eventModel');

// @desc    Get all gallery items for a specific event
// @route   GET /api/gallery/event/:eventId
// @access  Public
const getGalleryByEvent = async (req, res) => {
  try {
    const items = await GalleryItem.findAll({
      where: { eventId: req.params.eventId },
      include: {
        model: Event,
        attributes: ['title', 'date'],
      },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a new item to the gallery
// @route   POST /api/gallery
// @access  Private/Admin
const addGalleryItem = async (req, res) => {
  try {
    const { type, url, description, eventId } = req.body;

    if (!type || !url || !eventId) {
      return res.status(400).json({ message: 'Type, URL, and Event ID are required.' });
    }

    const item = await GalleryItem.create({
      type,
      url,
      description,
      eventId,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);

    if (item) {
      // Note: In Phase 4, you would also delete the file from S3 here.
      await item.destroy();
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getGalleryByEvent,
  addGalleryItem,
  deleteGalleryItem,
};
