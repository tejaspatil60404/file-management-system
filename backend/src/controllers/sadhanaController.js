// backend/src/controllers/sadhanaController.js

const User = require('../models/userModel');
const CounsellorAssignment = require('../models/counsellorAssignmentModel');
const SadhanaRecord = require('../models/sadhanaRecordModel');

// @desc    Assign a user to a counsellor
// @route   POST /api/sadhana/assign
// @access  Private/Admin
const assignCounsellor = async (req, res) => {
  try {
    const { userId, counsellorId } = req.body;

    // Validate input
    if (!userId || !counsellorId) {
        return res.status(400).json({ message: 'User ID and Counsellor ID are required.' });
    }

    // --- ADDED VALIDATION ---
    // Ensure both the user and the counsellor actually exist before creating an assignment
    const userToAssign = await User.findByPk(userId);
    const counsellor = await User.findOne({ where: { id: counsellorId, role: 'counsellor' } });

    if (!userToAssign) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
    if (!counsellor) {
        return res.status(404).json({ message: `Counsellor with ID ${counsellorId} not found or is not a counsellor.` });
    }
    // --- END OF VALIDATION ---


    // Check if an assignment already exists for this user
    let assignment = await CounsellorAssignment.findOne({ where: { userId: userId } });

    if (assignment) {
      // If it exists, update the counsellor
      assignment.counsellorId = counsellorId;
      await assignment.save();
      res.json({ message: 'Counsellor assignment updated successfully.', assignment });
    } else {
      // If it does not exist, create a new one
      assignment = await CounsellorAssignment.create({
        userId: userId,
        counsellorId: counsellorId,
      });
      res.status(201).json({ message: 'User assigned to counsellor successfully.', assignment });
    }
  } catch (error) {
    // This will log the detailed error to your backend terminal
    console.error('Error in assignCounsellor:', error); 
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all users assigned to the logged-in counsellor
// @route   GET /api/sadhana/my-users
// @access  Private/Counsellor
const getAssignedUsers = async (req, res) => {
  try {
    const assignments = await CounsellorAssignment.findAll({
      where: { counsellorId: req.user.id },
      include: [{ model: User, as: 'Counselee', attributes: ['id', 'username', 'email'] }],
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all sadhana records for a specific user
// @route   GET /api/sadhana/records/:userId
// @access  Private/Counsellor
const getSadhanaRecordsForUser = async (req, res) => {
  try {
    const records = await SadhanaRecord.findAll({
      where: { userId: req.params.userId },
      order: [['recordDate', 'DESC']],
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a sadhana record for a user
// @route   POST /api/sadhana/records
// @access  Private/Counsellor
const addSadhanaRecord = async (req, res) => {
    try {
        const { userId, level, notes } = req.body;
        const counsellorId = req.user.id;
        const record = await SadhanaRecord.create({
            userId,
            counsellorId,
            level,
            notes,
        });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all counsellor assignments for the admin view
// @route   GET /api/sadhana/all-assignments
// @access  Private/Admin
const getAllAssignments = async (req, res) => {
  try {
    const assignments = await CounsellorAssignment.findAll({
      // Include the user details for both the counsellor and the counselee
      include: [
        { model: User, as: 'Counsellor', attributes: ['id', 'username'] },
        { model: User, as: 'Counselee', attributes: ['id', 'username', 'email'] }
      ],
      order: [[{ model: User, as: 'Counsellor' }, 'username', 'ASC']],
    });
    res.json(assignments);
  } catch (error) {
    console.error('Error in getAllAssignments:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
    assignCounsellor,
    getAssignedUsers,
    getSadhanaRecordsForUser,
    addSadhanaRecord,
    getAllAssignments
};