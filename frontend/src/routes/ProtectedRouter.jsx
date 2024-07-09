
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children; // Render children if the user is authenticated
};

export default ProtectedRoute;


