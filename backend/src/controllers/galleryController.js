// backend/src/controllers/galleryController.js

const GalleryItem = require('../models/galleryItemModel');
const Event = require('../models/eventModel');
const { processItems } = require('../utils/urlHelper');

// @desc    Get all gallery items with their event info
const getAllGalleryItems = async (req, res) => {
  try {
    const items = await GalleryItem.findAll({
      include: {
        model: Event,
        attributes: ['title', 'date'],
      },
      order: [['createdAt', 'DESC']],
    });
    // The processItems helper will handle converting to plain objects and adding the base URL
    res.json(processItems(items, 'url'));
  } catch (error) {
    // This will log the detailed error to your backend terminal
    console.error('Error in getAllGalleryItems:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all gallery items for a specific event
const getGalleryByEvent = async (req, res) => {
  try {
    const items = await GalleryItem.findAll({
      where: { eventId: req.params.eventId },
      include: {
        model: Event,
        attributes: ['title', 'date'],
      },
    });
    res.json(processItems(items, 'url'));
  } catch (error) {
    console.error(`Error in getGalleryByEvent for eventId ${req.params.eventId}:`, error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a new item to the gallery
const addGalleryItem = async (req, res) => {
  try {
    const { type, url, description, eventId } = req.body;
    if (!type || !url || !eventId) {
      return res.status(400).json({ message: 'Type, URL, and Event ID are required.' });
    }
    const item = await GalleryItem.create({ type, url, description, eventId });
    res.status(201).json(item);
  } catch (error) {
    console.error('Error in addGalleryItem:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a gallery item
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await GalleryItem.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    console.error(`Error in deleteGalleryItem for id ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getAllGalleryItems,
  getGalleryByEvent,
  addGalleryItem,
  deleteGalleryItem,
};