// backend/src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes in this file are protected and admin-only
router.use(protect, admin);

// Route to get all users
router.get('/', getUsers);

// Route to update a user's role
router.put('/:id/role', updateUserRole);

module.exports = router;
