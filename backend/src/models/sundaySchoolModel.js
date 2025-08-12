// backend/src/models/sundaySchoolModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SundaySchool = sequelize.define('SundaySchool', {
  // This table will likely only ever have one row to store all settings.
  // We can use an ID of 1 by default.
  upcomingEventTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Upcoming Event Title',
  },
  upcomingEventDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Details about the upcoming event.',
  },
  upcomingEventDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  upcomingEventImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // We will store the timetable as a JSON string for flexibility.
  timetableJson: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '[]', // Default to an empty array string
    get() {
      // Automatically parse the JSON string when you get the data
      const rawValue = this.getDataValue('timetableJson');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      // Automatically stringify the array when you save it
      this.setDataValue('timetableJson', JSON.stringify(value));
    }
  },
});

module.exports = SundaySchool;
