import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/use-current-user';

/**
 * @description To protect the routes inside of it from unauthenticated users
 *
 * @function @component ProtectedRoute
 * @example A route guard that protects authenticated routes, will redirect unauthenticated users to /login
 * @returns { JSX.Element }
 */
const ProtectedRoute: React.FC = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
