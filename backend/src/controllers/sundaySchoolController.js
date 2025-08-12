// backend/src/controllers/sundaySchoolController.js

const SundaySchool = require('../models/sundaySchoolModel');

// @desc    Get the Sunday School program details
// @route   GET /api/sunday-school
// @access  Public
const getSundaySchoolDetails = async (req, res) => {
  try {
    // We use findOrCreate to ensure there's always one entry in the table.
    // This is a simple way to manage a "settings" style table.
    const [details, created] = await SundaySchool.findOrCreate({
      where: { id: 1 },
      defaults: {}, // Default values are set in the model
    });
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update the Sunday School program details
// @route   PUT /api/sunday-school
// @access  Private/Admin
const updateSundaySchoolDetails = async (req, res) => {
  try {
    const { upcomingEventTitle, upcomingEventDescription, upcomingEventDate, upcomingEventImage, timetableJson } = req.body;
    
    const [details, created] = await SundaySchool.findOrCreate({
        where: { id: 1 },
        defaults: {},
    });

    details.upcomingEventTitle = upcomingEventTitle || details.upcomingEventTitle;
    details.upcomingEventDescription = upcomingEventDescription || details.upcomingEventDescription;
    details.upcomingEventDate = upcomingEventDate || details.upcomingEventDate;
    details.upcomingEventImage = upcomingEventImage || details.upcomingEventImage;
    details.timetableJson = timetableJson || details.timetableJson;

    const updatedDetails = await details.save();
    res.json(updatedDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getSundaySchoolDetails,
  updateSundaySchoolDetails,
};