import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import './navbar.scss';

export default function Navbar() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/');
  };

  return (
    <div className="navbar-wrapper">
      <div className="topbar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="logo">bendwell</div>
        </Link>

        <div className="navbar-content">
          {session ? (
            <>
              <NavLink to="/stretches" label="STRETCHES" underline />
              <NavLink to="/routines" label="ROUTINES" underline />
              <NavLink to="/account" label="ACCOUNT" underline />
              <NavLink to="/about" label="ABOUT US" underline />
            </>
          ) : (
            <>
              <NavLink to="/about" label="ABOUT US" />
              <NavLink to="/stretches" label="STRETCHES" />
            </>
          )}
        </div>

        <div className="nav-actions">
          {!session ? (
            <>
              <Link to="/signup">
                <button className="nav-button">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="nav-button">Login</button>
              </Link>
            </>
          ) : (
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
  // setMenuOpen: (open: boolean) => void;
  underline?: boolean;
}

function NavLink({ to, label, underline = false }: NavLinkProps) {
  return (
    <div className="navbar-content-link">
      <Link to={to} style={{ textDecoration: 'none' }}>
        {label}
      </Link>
      {underline && <span className="navbar-content-link-underline"></span>}
    </div>
  );
}
