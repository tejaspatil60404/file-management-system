const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Document = sequelize.define('Document', {
  fileName: { type: DataTypes.STRING, allowNull: false },
  filePath: { type: DataTypes.STRING, allowNull: false },
  fileType: { type: DataTypes.STRING, allowNull: false },
  visibility: { type: DataTypes.STRING, defaultValue: 'private' },
  uploaderId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Document;