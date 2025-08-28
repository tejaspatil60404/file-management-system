// frontend/src/components/Navbar.js

import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// MUI Imports
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Events', path: '/events' },
    { text: 'Gallery', path: '/gallery' },
    { text: 'Sunday School', path: '/sunday-school' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ISKCON Temple
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={RouterLink} to={item.path} disablePadding>
            <ListItemText primary={item.text} sx={{ textAlign: 'center' }}/>
          </ListItem>
        ))}
        <Divider />
        <ListItem component={RouterLink} to="/donate" disablePadding>
            <ListItemText primary="Donate Now" sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold' }}/>
        </ListItem>
        <Divider />
        {user ? (
            <Box>
                {/* --- CORRECTED: Added "My Donations" link for logged-in users --- */}
                <ListItem component={RouterLink} to="/my-donations" disablePadding>
                    <ListItemText primary="My Donations" sx={{ textAlign: 'center' }}/>
                </ListItem>
                {(user.role === 'counsellor' || user.role === 'admin') && (
                    <ListItem component={RouterLink} to="/counsellor" disablePadding>
                        <ListItemText primary="Sadhana" sx={{ textAlign: 'center' }}/>
                    </ListItem>
                )}
                {user.role === 'admin' && (
                    <ListItem component={RouterLink} to="/admin" disablePadding>
                        <ListItemText primary="Admin" sx={{ textAlign: 'center' }}/>
                    </ListItem>
                )}
                <ListItem onClick={handleLogout} button>
                    <ListItemText primary="Logout" sx={{ textAlign: 'center' }}/>
                </ListItem>
            </Box>
        ) : (
            <Box>
                <ListItem component={RouterLink} to="/login" disablePadding>
                    <ListItemText primary="Login" sx={{ textAlign: 'center' }}/>
                </ListItem>
                <ListItem component={RouterLink} to="/register" disablePadding>
                    <ListItemText primary="Register" sx={{ textAlign: 'center' }}/>
                </ListItem>
            </Box>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: 'inherit', textDecoration: 'none' }}
          >
            ISKCON Temple
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: 'auto' }}>
            {navItems.map((item) => (
              <Button key={item.text} component={RouterLink} to={item.path} sx={{ color: '#fff' }}>
                {item.text}
              </Button>
            ))}
            
            <Button 
              component={RouterLink} 
              to="/donate" 
              variant="outlined" 
              sx={{ 
                ml: 2, 
                fontWeight: 'bold',
                color: '#f0ad4e',
                borderColor: '#f0ad4e',
                '&:hover': {
                    backgroundColor: 'rgba(240, 173, 78, 0.1)',
                    borderColor: '#f0ad4e',
                }
              }}
            >
              Donate Now
            </Button>

            {user ? (
                <>
                    <Button component={RouterLink} to="/my-donations" sx={{ color: '#fff' }}>
                        My Donations
                    </Button>
                    {(user.role === 'counsellor' || user.role === 'admin') && (
                        <Button component={RouterLink} to="/counsellor" sx={{ color: '#fff' }}>Sadhana</Button>
                    )}
                    {user.role === 'admin' && (
                        <Button component={RouterLink} to="/admin" sx={{ color: '#fff' }}>Admin</Button>
                    )}
                    <Button onClick={handleLogout} color="inherit">
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button component={RouterLink} to="/login" color="inherit">Login</Button>
                    <Button component={RouterLink} to="/register" color="inherit">Register</Button>
                </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default Navbar;
