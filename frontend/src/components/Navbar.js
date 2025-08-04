// frontend/src/components/Navbar.js (Updated)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ISKCON Temple
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-links">Events</Link>
          </li>
          <li className="nav-item">
            <Link to="/gallery" className="nav-links">Gallery</Link>
          </li>
          {user ? (
            <>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-links">Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links-btn">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links-btn">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links-btn">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
