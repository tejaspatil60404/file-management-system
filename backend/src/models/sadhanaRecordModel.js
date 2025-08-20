const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SadhanaRecord = sequelize.define('SadhanaRecord', {
  level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  notes: { type: DataTypes.TEXT, allowNull: true },
  recordDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  counsellorId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = SadhanaRecord;