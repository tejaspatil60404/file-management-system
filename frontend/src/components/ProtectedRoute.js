// frontend/src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// The component now accepts an array of allowed roles
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // 1. Check if the user is logged in
  if (!user) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // 2. Check if the user's role is in the list of allowed roles
  // If allowedRoles is not provided, just being logged in is enough
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If user's role is not permitted, redirect to the homepage
    return <Navigate to="/" />;
  }

  // 3. If all checks pass, render the child component
  return <Outlet />;
};

export default ProtectedRoute;
