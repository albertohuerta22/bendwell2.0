import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabase';
import type { Session } from '@supabase/supabase-js';
import './navbar.scss';

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const [session, setSession] = useState<Session | null>(null);

  const navigate = useNavigate();

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
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null); // manually clear session
      navigate('/'); // redirect to landing page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="navbar-wrapper">
      {/* Topbar: Logo + Auth Buttons + Hamburger */}
      <div className="topbar">
        <div className="topbar-left">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <div className="logo">bendwell</div>
          </Link>
        </div>
        <div className="topbar-right">
          <div className="topbar-right-button">
            {!session ? (
              <>
                <Link to="/signup">
                  <button onClick={() => setMenuOpen(false)}>Sign Up</button>
                </Link>
                <Link to="/login">
                  <button onClick={() => setMenuOpen(false)}>Login</button>
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout(); // use the new function
                }}
              >
                Logout
              </button>
            )}
          </div>
          <div className="topbar-right-menu">
            <div
              className={`hamburger ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="line1"></span>
              <span className="line2"></span>
              <span className="line3"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <div className={`navbar ${menuOpen ? 'active' : ''}`}>
        <div className="navbar-content">
          {session ? (
            <>
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
            </>
          ) : (
            <>
              <NavLink to="/about" setMenuOpen={setMenuOpen} label="ABOUT US" />
              <NavLink
                to="/stretches"
                setMenuOpen={setMenuOpen}
                label="STRETCHES"
              />
            </>
          )}
        </div>
      </div>
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
