import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return setAuthorized(false);

      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (error) console.error('Supabase error: ', error);

      setAuthorized(data?.is_admin ?? false);
    });
  }, []);

  if (authorized === null) return null; // or loading spinner
  return authorized ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
