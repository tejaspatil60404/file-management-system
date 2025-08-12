// backend/src/routes/documentRoutes.js

const express = require('express');
const router = express.Router();
const {
  getDocuments,
  addDocument,
  deleteDocument,
} = require('../controllers/documentController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes in this file are protected and admin-only
router.use(protect, admin);

router.route('/')
  .get(getDocuments)
  .post(addDocument);

router.route('/:id')
  .delete(deleteDocument);

module.exports = router;
