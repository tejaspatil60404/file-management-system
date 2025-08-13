// frontend/src/services/sundaySchoolService.js

import api from './api';

// --- Public Route ---

// Get the Sunday School program details
const getSundaySchoolDetails = () => {
  return api.get('/sunday-school');
};

// --- Admin Route ---

// Update the Sunday School program details
const updateSundaySchoolDetails = (detailsData) => {
  return api.put('/sunday-school', detailsData);
};


const sundaySchoolService = {
  getSundaySchoolDetails,
  updateSundaySchoolDetails,
};

export default sundaySchoolService;
