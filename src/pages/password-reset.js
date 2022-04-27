import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, resetPasswordEmail } from '../firebase';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';

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
    <PageTemplate>
      <div className="container">
        <h1 className="mb-3">Reset Password</h1>
        <form onSubmit={handlePasswordReset}>
          <InputField
            id="passwordResetEmail"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="row align-items-center">
            <div className="col-md-auto">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Reset Password
              </button>
            </div>
            <div className="col-md my-3 my-md-0 text-md-end text-secondary">
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