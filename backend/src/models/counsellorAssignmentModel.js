const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CounsellorAssignment = sequelize.define('CounsellorAssignment', {
  counsellorId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false, unique: true }
});

module.exports = CounsellorAssignment;