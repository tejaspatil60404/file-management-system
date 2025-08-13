// frontend/src/pages/AdminDocumentsPage.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, CircularProgress, Alert } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import documentService from '../services/documentService';
import uploadService from '../services/uploadService';

const AdminDocumentsPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentService.getDocuments();
      setDocuments(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError('');
    try {
      // Step 1: Upload the file to the generic upload endpoint
      const uploadRes = await uploadService.uploadFile(selectedFile);

      // Step 2: Save the file metadata to the documents table
      const documentData = {
        fileName: selectedFile.name,
        filePath: uploadRes.data.filePath,
        fileType: selectedFile.type,
      };
      await documentService.addDocument(documentData);

      // Step 3: Refresh the list
      fetchDocuments();
      setSelectedFile(null); // Reset the file input
    } catch (err) {
      setError('File upload failed.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
        try {
            await documentService.deleteDocument(id);
            fetchDocuments(); // Refresh list
        } catch (err) {
            setError('Failed to delete document.');
        }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Confidential Documents
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Upload New Document</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" component="label" startIcon={<UploadFileIcon />}>
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
          >
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </Box>
      </Paper>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="documents table">
            <TableHead sx={{ backgroundColor: '#333' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>File Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Uploaded At</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.fileName}</TableCell>
                  <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton color="default" href={doc.filePath} target="_blank" rel="noopener noreferrer">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(doc.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminDocumentsPage;
