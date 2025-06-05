// backend/controllers/fileController.js

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  return res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file.filename,
    path: req.file.path,
  });
};

module.exports = {
  uploadFile,
};
