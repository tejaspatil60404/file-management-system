// File: /backend/src/models/donationModel.js (Simplified & Safe)
// ==========================================================================
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Donation = sequelize.define('Donation', {
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  currency: { type: DataTypes.STRING, allowNull: false, defaultValue: 'INR' },
  receipt: { type: DataTypes.STRING, allowNull: false, unique: true },
  razorpayOrderId: { type: DataTypes.STRING, allowNull: false, unique: true },
  razorpayPaymentId: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'created' },
  userId: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Donation;