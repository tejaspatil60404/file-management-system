// backend/src/controllers/userController.js

const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    // Find all users, excluding their passwords from the result
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a user's role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (user) {
      // Check if the provided role is valid
      if (['user', 'counsellor', 'admin'].includes(role)) {
        user.role = role;
        await user.save();
        res.json({ message: 'User role updated successfully' });
      } else {
        res.status(400).json({ message: 'Invalid role specified' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getUsers,
  updateUserRole,
};
