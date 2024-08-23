import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const isAuthenticated = !!localStorage.getItem('auth');

  return (
    <Route
      path={path}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
