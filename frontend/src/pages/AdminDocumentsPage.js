// frontend/src/pages/AdminDocumentsPage.js

import React, { useState } from 'react';
import { Container, Typography, Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

// --- Mock Data (This will be replaced by an API call later) ---
const mockDocuments = [
  { id: 1, name: 'Donation_Receipt_April_2025.pdf', type: 'Receipt', uploadedAt: '2025-05-01' },
  { id: 2, name: 'Catering_Invoice_Janmashtami.pdf', type: 'Billing', uploadedAt: '2025-08-28' },
  { id: 3, name: 'Donation_Receipt_May_2025.pdf', type: 'Receipt', uploadedAt: '2025-06-01' },
];
// --- End of Mock Data ---

const AdminDocumentsPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading confidential file:', selectedFile);
      // The actual upload logic will be added in Phase 4
      setSelectedFile(null); // Reset after "upload"
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
        Manage Confidential Documents
      </Typography>

      {/* Upload Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Upload New Document</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
          >
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Box>
      </Paper>

      {/* Documents Table */}
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="documents table">
          <TableHead sx={{ backgroundColor: '#333' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>File Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Uploaded At</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{new Date(doc.uploadedAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton color="default" aria-label="view document">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="delete document">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDocumentsPage;
