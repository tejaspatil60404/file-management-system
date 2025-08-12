// backend/src/models/galleryItemModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Event = require('./eventModel');

const GalleryItem = sequelize.define('GalleryItem', {
  type: {
    type: DataTypes.STRING, // 'image' or 'video'
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING, // Path to the file, e.g., '/uploads/image.jpg'
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

// A gallery item belongs to one event
GalleryItem.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(GalleryItem, { foreignKey: 'eventId' });

module.exports = GalleryItem;
