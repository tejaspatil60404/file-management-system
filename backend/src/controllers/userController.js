// backend/src/controllers/userController.js

const User = require('../models/userModel');
const CounsellorAssignment = require('../models/counsellorAssignmentModel');
const { Op } = require('sequelize');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      include: {
        model: CounsellorAssignment,
        as: 'AssignmentAsCounselee', // Use the correct unique alias
        required: false,
        include: {
          model: User,
          as: 'Counsellor',
          attributes: ['username'],
        },
      },
      order: [['id', 'ASC']],
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
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
      attributes: ['id', 'username'],
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

// @desc    Get all users who are not assigned to any counsellor
// @route   GET /api/users/unassigned
// @access  Private/Counsellor
const getUnassignedUsers = async (req, res) => {
  try {
    const assignments = await CounsellorAssignment.findAll({
      attributes: ['userId']
    });
    const assignedUserIds = assignments.map(a => a.userId);

    const unassignedUsers = await User.findAll({
      where: {
        id: { [Op.notIn]: assignedUserIds },
        role: 'user'
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
