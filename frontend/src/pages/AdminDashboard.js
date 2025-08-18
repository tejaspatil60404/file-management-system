// frontend/src/pages/AdminDashboard.js

import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School'; // New Icon
import GroupsIcon from '@mui/icons-material/Groups';

const AdminDashboard = () => {
  const adminLinks = [
    { title: 'Manage Users', path: '/admin/users', icon: <PeopleIcon fontSize="large" /> },
    { title: 'Manage Events', path: '/admin/events', icon: <EventIcon fontSize="large" /> },
    { title: 'Manage Galleries', path: '/admin/galleries', icon: <PhotoLibraryIcon fontSize="large" /> },
    { title: 'Manage Documents', path: '/admin/documents', icon: <DescriptionIcon fontSize="large" /> },
    { title: 'Sadhana Program', path: '/admin/sadhana', icon: <GroupsIcon fontSize="large" /> },
    // --- New Link for Sunday School ---
    { title: 'Manage Sunday School', path: '/admin/sunday-school', icon: <SchoolIcon fontSize="large" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {adminLinks.map((link) => (
          <Grid item xs={12} sm={6} md={4} key={link.title}>
            <Paper
              component={RouterLink}
              to={link.path}
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: 'inherit',
                height: 180,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>{link.icon}</Box>
              <Typography variant="h6" component="h2">
                {link.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
