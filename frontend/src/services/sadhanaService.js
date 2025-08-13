// frontend/src/services/sadhanaService.js

import api from './api';

// --- Admin Routes ---

// Assign a user to a counsellor
const assignCounsellor = (userId, counsellorId) => {
  return api.post('/sadhana/assign', { userId, counsellorId });
};

// --- Counsellor Routes ---

// Get all users assigned to the logged-in counsellor
const getAssignedUsers = () => {
  return api.get('/sadhana/my-users');
};

// Get all sadhana records for a specific user
const getSadhanaRecordsForUser = (userId) => {
  return api.get(`/sadhana/records/${userId}`);
};

// Add a sadhana record for a user
const addSadhanaRecord = (recordData) => {
  return api.post('/sadhana/records', recordData);
};


const sadhanaService = {
  assignCounsellor,
  getAssignedUsers,
  getSadhanaRecordsForUser,
  addSadhanaRecord,
};

export default sadhanaService;
