// backend/src/controllers/documentController.js

// backend/src/controllers/documentController.js

const Document = require('../models/documentModel');
const { processItems } = require('../utils/urlHelper');

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(processItems(documents, 'filePath'));
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a new document record
const addDocument = async (req, res) => {
  try {
    const { fileName, filePath, fileType } = req.body;
    const uploaderId = req.user.id; // From 'protect' middleware

    if (!fileName || !filePath || !fileType) {
      return res.status(400).json({ message: 'File name, path, and type are required.' });
    }

    const document = await Document.create({
      fileName,
      filePath,
      fileType,
      uploaderId,
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a document
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);

    if (document) {
      await document.destroy();
      res.json({ message: 'Document removed' });
    } else {
      res.status(404).json({ message: 'Document not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getDocuments,
  addDocument,
  deleteDocument,
};
