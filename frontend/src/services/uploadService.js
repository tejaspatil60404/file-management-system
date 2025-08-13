// frontend/src/services/uploadService.js

import api from './api';

// This function handles uploading a file using multipart/form-data
const uploadFile = (file) => {
    // Create a new FormData object to hold the file
    const formData = new FormData();
    // 'file' is the key the backend (multer) will look for
    formData.append('file', file);

    // Use the central 'api' instance to make the request.
    // The interceptor in api.js will automatically add the auth token.
    return api.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const uploadService = {
    uploadFile,
};

export default uploadService;
