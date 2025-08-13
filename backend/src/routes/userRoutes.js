// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUsers, getCounsellors, updateUserRole } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes in this file are protected and admin-only
router.use(protect, admin);

router.get('/', getUsers);
router.get('/counsellors', getCounsellors); // <-- Make sure this line exists
router.put('/:id/role', updateUserRole);

module.exports = router;