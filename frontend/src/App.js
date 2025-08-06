// frontend/src/App.js (Updated)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import GalleryPage from './pages/GalleryPage';
import SundaySchoolPage from './pages/SundaySchoolPage'; // <-- Import the new page
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: '56px', sm: '64px' } }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/sunday-school" element={<SundaySchoolPage />} /> {/* <-- Add the new route */}
          </Routes>
        </Box>
      </div>
    </Router>
  );
}

export default App;
