// backend/src/models/sadhanaRecordModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SadhanaRecord = sequelize.define('SadhanaRecord', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  recordDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  // --- NEW FIELDS ---
  chantingRounds: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  readingInMinutes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  shravan: { // Hearing/Listening
    type: DataTypes.STRING,
    defaultValue: 'No', // Can be 'Yes', 'No', 'Partial'
  },
  seva: { // Service
    type: DataTypes.STRING,
    defaultValue: 'No',
  },
  remarks: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // --- Foreign Keys ---
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  counsellorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = SadhanaRecord;
