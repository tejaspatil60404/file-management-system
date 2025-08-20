const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GalleryItem = sequelize.define('GalleryItem', {
  type: { type: DataTypes.STRING, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  eventId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = GalleryItem;