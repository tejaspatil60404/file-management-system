// backend/src/controllers/userController.js

const User = require('../models/userModel');
const CounsellorAssignment = require('../models/counsellorAssignmentModel');
const { Op } = require('sequelize'); // Import the Op operator for advanced queries

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all users with the role of 'counsellor'
// @route   GET /api/users/counsellors
// @access  Private/Admin
const getCounsellors = async (req, res) => {
  try {
    const counsellors = await User.findAll({
      where: { role: 'counsellor' },
      attributes: ['id', 'username'], // Only send necessary info
    });
    res.json(counsellors);
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

// ... (keep existing functions like getUsers, getCounsellors, etc.)

// @desc    Get all users who are not assigned to any counsellor
// @route   GET /api/users/unassigned
// @access  Private/Counsellor
const getUnassignedUsers = async (req, res) => {
  try {
    const assignments = await CounsellorAssignment.findAll({
      attributes: ['userId'] // Get all IDs of users who are already assigned
    });
    const assignedUserIds = assignments.map(a => a.userId);

    const unassignedUsers = await User.findAll({
      where: {
        id: { [Op.notIn]: assignedUserIds }, // Find users whose ID is NOT IN the assigned list
        role: 'user' // Only find users with the 'user' role
      },
      attributes: ['id', 'username', 'email']
    });

    res.json(unassignedUsers);
  } catch (error) {
    console.error("Error fetching unassigned users:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getUsers,
  getCounsellors,
  updateUserRole,
  getUnassignedUsers,
};