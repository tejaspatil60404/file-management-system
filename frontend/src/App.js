// frontend/src/App.js (Updated)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import GalleryPage from './pages/GalleryPage';
import SundaySchoolPage from './pages/SundaySchoolPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminDocumentsPage from './pages/AdminDocumentsPage';
import AdminUsersPage from './pages/AdminUsersPage'; // <-- Import the new page
import { Box } from '@mui/material';
import CounsellorDashboard from './pages/CounsellorDashboard'; // <-- Import the counsellor dashboard
import AdminGalleriesPage from './pages/AdminGalleriesPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: { xs: '56px', sm: '64px' } }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/sunday-school" element={<SundaySchoolPage />} />

            {/* Counsellor & Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['counsellor', 'admin']} />}>
              <Route path="/counsellor" element={<CounsellorDashboard />} />
            </Route>

            {/* Admin-Only Routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/events" element={<AdminEventsPage />} />
              <Route path="/admin/documents" element={<AdminDocumentsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} /> {/* <-- Add the new route */}
              <Route path="/admin/galleries" element={<AdminGalleriesPage />} />
            </Route>
          </Routes>
        </Box>
      </div>
    </Router>
  );
}

export default App;

