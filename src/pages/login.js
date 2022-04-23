import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../firebase';

export default function Login() { 
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
        <div className='d-flex align-items-center justify-content-between'>
          {/* todo: forgot password (see sendPasswordReset in firebase.js) */}
          <button
            className="btn btn-primary"
            type="submit"
          >
            Log in
          </button>
          <div className='text-secondary'>
            Don't have an account? {}
            <Link to="/register">
              Sign Up Today.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}