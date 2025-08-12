// backend/src/controllers/sadhanaController.js

const User = require('../models/userModel');
const CounsellorAssignment = require('../models/counsellorAssignmentModel');
const SadhanaRecord = require('../models/sadhanaRecordModel');

// @desc    Assign a user to a counsellor
// @route   POST /api/sadhana/assign
// @access  Private/Admin
exports.assignCounsellor = async (req, res) => {
  try {
    const { userId, counsellorId } = req.body;

    const [assignment, created] = await CounsellorAssignment.findOrCreate({
      where: { userId: userId },
      defaults: { counsellorId: counsellorId },
    });

    if (!created) {
      assignment.counsellorId = counsellorId;
      await assignment.save();
      return res.json({ message: 'Counsellor assignment updated successfully.', assignment });
    }

    res.status(201).json({ message: 'User assigned to counsellor successfully.', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all users assigned to the logged-in counsellor
// @route   GET /api/sadhana/my-users
// @access  Private/Counsellor
exports.getAssignedUsers = async (req, res) => {
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

// @desc    Add a sadhana record for a user
// @route   POST /api/sadhana/records
// @access  Private/Counsellor
exports.addSadhanaRecord = async (req, res) => {
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