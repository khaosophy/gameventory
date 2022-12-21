import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, loginWithEmailAndPassword } from '../firebase';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';

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
    <PageTemplate title="Login">
      <div className="container">
        <h1 className="mb-3">Login</h1>
        <form onSubmit={handleLogin}>
          <InputField
            id="loginEmail"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
          />

          <InputField
            id="loginPass"
            label="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            autoComplete="current-password"
          />
          
          <div className="row align-items-center">
            <div className="col-md-auto">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Log in
              </button>
            </div>
            <div className="col-md-3 my-3 my-md-0">
              <Link to="/reset-password">
                Forgot Password?
              </Link>
            </div>
            <div className="col-md text-md-end">
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