// backend/controllers/fileController.js

const File = require('../models/File');

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const newFile = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    await newFile.save();

    res.status(200).json({
      message: 'File uploaded and saved to DB successfully',
      file: newFile,
    });
  } catch (err) {
    res.status(500).json({ message: 'File upload failed', error: err });
  }
};


const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({}, 'originalName fileName size uploadedAt').sort({ uploadedAt: -1 });

    res.status(200).json({
      message: 'Files retrieved successfully',
      files: files
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch files', error });
  }
};


module.exports = {
  uploadFile,
  getAllFiles, // don't forget to export it
};
