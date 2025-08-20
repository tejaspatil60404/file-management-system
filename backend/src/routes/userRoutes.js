// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUsers, getCounsellors, updateUserRole, getUnassignedUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Middleware for counsellor access
const counsellor = (req, res, next) => {
    if (req.user && (req.user.role === 'counsellor' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as a counsellor' });
    }
};

// ... (keep existing admin routes)

// Add new route for counsellors/admins
router.get('/unassigned', protect, counsellor, getUnassignedUsers);
// All routes in this file are protected and admin-only
router.use(protect, admin);

router.get('/', getUsers);
router.get('/counsellors', getCounsellors); // <-- Make sure this line exists
router.put('/:id/role', updateUserRole);

module.exports = router;