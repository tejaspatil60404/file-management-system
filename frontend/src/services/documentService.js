// frontend/src/services/documentService.js

import api from './api';

// Get all documents (admin only)
const getDocuments = () => {
  return api.get('/documents');
};

// Add a new document record (admin only)
const addDocument = (documentData) => {
  return api.post('/documents', documentData);
};

// Delete a document (admin only)
const deleteDocument = (id) => {
  return api.delete(`/documents/${id}`);
};

const documentService = {
  getDocuments,
  addDocument,
  deleteDocument,
};

export default documentService;
