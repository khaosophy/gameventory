import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../firebase';
import PageTemplate from '../templates/page-template';

export default function Register() {  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  /* todo: update/change password page */

  useEffect(() => {
    if(loading) return;
    if (user) navigate('/');
  }, [user, loading, navigate]);

  function handleRegister(e) {
    e.preventDefault();
    // todo: confirm passwords
    registerWithEmailAndPassword(name, email, pass);
  }

  return (
    <PageTemplate>
      <div className="container">
        <h1 className="mb-3">Register</h1>
        <form onSubmit={handleRegister}>
          {/* todo: labels */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input 
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <div className='d-flex align-items-center justify-content-between'>
            <button
              className="btn btn-primary"
              type="submit"
            >
              Register
            </button>
            <div className='text-secondary'>
              Already have an account? {}
              <Link to="/login">
                Log in here.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </PageTemplate>
  );
}