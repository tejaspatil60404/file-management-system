// backend/src/models/userModel.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Import the sequelize instance
const bcrypt = require('bcryptjs');

// Define the User model/table
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']],
    },
  },
});

// Sequelize Hook: This runs before a new user is created
// It automatically hashes the password.
User.beforeCreate(async (user, options) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = User;
