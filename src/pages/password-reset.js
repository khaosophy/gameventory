import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, resetPasswordEmail } from '../firebase';

export default function PasswordReset() { 
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // todo: loading screen?
      return;
    }
    if (user) navigate('/');
  }, [user, loading, navigate]);

  function handlePasswordReset(e) {
    /* todo: better messaging */
    e.preventDefault();
    resetPasswordEmail(email);
  }

  return (
    <div className="container">
      <h1 className="mb-3">Reset Password</h1>
      <form onSubmit={handlePasswordReset}>
        {/* todo: label */}
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="d-flex align-items-center text-secondary justify-content-between">
          <div>
            <button
              className="btn btn-primary"
              type="submit"
            >
              Reset Password
            </button>
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
  );
}