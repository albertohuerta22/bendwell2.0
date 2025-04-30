import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../../lib/supabase';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/home');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center" id="login-container">
      <div
        className="col-6 form-widget"
        aria-live="polite"
        id="content-container"
      >
        <h2 className="description">Log In!</h2>
        <h3 className="login">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </h3>
        {loading ? (
          'Loading...'
        ) : (
          <form onSubmit={handleLogin}>
            <div className="content-block">
              <label htmlFor="email" id="email-label">
                Email
              </label>
              <input
                id="email"
                className="inputField"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="content-block">
              <label htmlFor="password" id="pass-label">
                Password
              </label>
              <input
                id="password"
                className="inputField"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="block" id="create-btn" disabled={loading}>
              Log in
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
