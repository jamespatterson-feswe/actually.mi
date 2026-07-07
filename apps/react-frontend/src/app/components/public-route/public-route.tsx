import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/use-current-user';

import React from 'react';

/**
 * @description To protect the routes inside of it from authenticated users
 *
 * @function @component ProtectedRoute
 * @example A route guard that protects unauthenticated routes, will redirect authenticated users to /feed if they access /login, /register
 * @returns { React.FC }
 */
const PublicRoute: React.FC = () => {
  const { data: user } = useCurrentUser(
    sessionStorage.getItem('loggedIn') === 'true',
  );

  if (user) return <Navigate to="/feed" replace />;

  return <Outlet />;
};

export default PublicRoute;
