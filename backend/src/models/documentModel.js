// backend/src/models/documentModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Document = sequelize.define('Document', {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING, // e.g., 'application/pdf'
    allowNull: false,
  },
  // This ensures these documents are never fetched by public APIs
  visibility: {
    type: DataTypes.STRING,
    defaultValue: 'private',
  },
});

// A document is uploaded by one user (an admin)
Document.belongsTo(User, { foreignKey: 'uploaderId' });
User.hasMany(Document, { foreignKey: 'uploaderId' });

module.exports = Document;