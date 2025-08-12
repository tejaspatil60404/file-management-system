// frontend/src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user } = useAuth();

  // 1. Check if the user is logged in
  if (!user) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // 2. Check if the route is for admins only and if the user is an admin
  if (adminOnly && user.role !== 'admin') {
    // If user is not an admin, redirect to the homepage (or an unauthorized page)
    return <Navigate to="/" />;
  }

  // 3. If all checks pass, render the child component
  return <Outlet />;
};

export default ProtectedRoute;
