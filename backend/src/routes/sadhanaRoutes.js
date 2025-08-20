// backend/src/routes/sadhanaRoutes.js

const express = require('express');
const router = express.Router();
const { 
    assignUserToSelf,
    assignCounsellor, 
    getAssignedUsers, 
    addSadhanaRecord,
    getSadhanaRecordsForUser,
    getAllAssignments
} = require('../controllers/sadhanaController');
const { protect, admin } = require('../middleware/authMiddleware');

// Middleware to check for counsellor role
const counsellor = (req, res, next) => {
    if (req.user && (req.user.role === 'counsellor' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a counsellor' });
    }
};

// Admin routes
router.post('/assign', protect, admin, assignCounsellor);
router.get('/all-assignments', protect, admin, getAllAssignments);

// Counsellor routes
router.post('/assign-self', protect, counsellor, assignUserToSelf); // <-- Add the new route
router.get('/my-users', protect, counsellor, getAssignedUsers);
router.post('/records', protect, counsellor, addSadhanaRecord);
router.get('/records/:userId', protect, counsellor, getSadhanaRecordsForUser);

module.exports = router;
