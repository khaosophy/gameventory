import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  // todo: continue from Sign In instructions
  // https://firebase.google.com/docs/auth/web/firebaseui#sign_in
  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="container">
      <h1 className="mb-3">Login</h1>
      <form>
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