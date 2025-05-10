import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });
  }, []);

  if (isAuthenticated === null) return null; // or loading spinner
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
