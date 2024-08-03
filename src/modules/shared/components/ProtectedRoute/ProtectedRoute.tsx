import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  authToken: string | null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  authToken,
}) => {
  if (authToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
