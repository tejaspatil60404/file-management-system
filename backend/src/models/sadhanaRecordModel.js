// backend/src/models/sadhanaRecordModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const SadhanaRecord = sequelize.define('SadhanaRecord', {
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  recordDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// A record belongs to ONE user (the counselee)
SadhanaRecord.belongsTo(User, { foreignKey: 'userId', as: 'Counselee' });

// A record is created by ONE counsellor (who is also a User)
SadhanaRecord.belongsTo(User, { as: 'Counsellor', foreignKey: 'counsellorId' });

module.exports = SadhanaRecord;