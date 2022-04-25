import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../firebase';
import PageTemplate from '../templates/page-template';

export default function Login() { 
  // for detailed tutorial, view this:
  // https://blog.logrocket.com/user-authentication-firebase-react-apps/
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // todo: loading screen?
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);

  function handleLogin(e) {
    e.preventDefault();
    loginWithEmailAndPassword(email, pass)
  }

  return (
    <PageTemplate>
      <div className="container">
        <h1 className="mb-3">Login</h1>
        <form onSubmit={handleLogin}>
          {/* todo: labels */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <div className="d-flex align-items-center text-secondary justify-content-between">
            <div>
              <button
                className="btn btn-primary"
                type="submit"
              >
                Log in
              </button>
              <Link to="/reset-password" className="ms-3">
                Forgot Password?
              </Link>
            </div>
            <div>
              Don't have an account? {}
              <Link to="/register">
                Sign Up Today.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </PageTemplate>
  );
}