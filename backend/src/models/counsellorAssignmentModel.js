// backend/src/models/counsellorAssignmentModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const CounsellorAssignment = sequelize.define('CounsellorAssignment', {
  // This model serves as a link between a counsellor and a user.
});

// An assignment belongs to ONE counsellor (who is a User)
CounsellorAssignment.belongsTo(User, { foreignKey: 'counsellorId', as: 'Counsellor' });

// An assignment belongs to ONE user (the counselee)
CounsellorAssignment.belongsTo(User, { foreignKey: 'userId', as: 'Counselee' });

module.exports = CounsellorAssignment;