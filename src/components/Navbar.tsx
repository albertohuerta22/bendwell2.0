import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className={`navbar ${menuOpen ? 'active' : ''}`}>
      {!session ? (
        <div className="navbar-content">
          <NavLink to="/about" setMenuOpen={setMenuOpen} label="ABOUT US" />
          <NavLink
            to="/stretches"
            setMenuOpen={setMenuOpen}
            label="STRETCHES"
          />
          <NavLink to="/signup" setMenuOpen={setMenuOpen} label="SIGN UP" />
          <NavLink to="/login" setMenuOpen={setMenuOpen} label="LOGIN" />
        </div>
      ) : (
        <div className="navbar-content">
          <NavLink
            to="/stretches"
            setMenuOpen={setMenuOpen}
            label="STRETCHES"
            underline
          />
          <NavLink
            to="/routines"
            setMenuOpen={setMenuOpen}
            label="ROUTINES"
            underline
          />
          <NavLink
            to="/account"
            setMenuOpen={setMenuOpen}
            label="ACCOUNT"
            underline
          />
          <NavLink
            to="/about"
            setMenuOpen={setMenuOpen}
            label="ABOUT US"
            underline
          />
        </div>
      )}
    </div>
  );
}

interface NavLinkProps {
  to: string;
  label: string;
  setMenuOpen: (open: boolean) => void;
  underline?: boolean;
}

function NavLink({ to, label, setMenuOpen, underline = false }: NavLinkProps) {
  return (
    <div className="navbar-content-link">
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        style={{ textDecoration: 'none' }}
      >
        {label}
      </Link>
      {underline && <span className="navbar-content-link-underline"></span>}
    </div>
  );
}
