import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirect them to the /login page if no token is found.
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
