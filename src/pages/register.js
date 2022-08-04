import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, registerWithEmailAndPassword } from '../firebase';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';

export default function Register() {  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  /* todo: update/change password page */

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/games');
  }, [user, loading, navigate]);

  function handleRegister(e) {
    e.preventDefault();
    // todo: confirm passwords
    registerWithEmailAndPassword(name, email, pass);
  }

  return (
    <PageTemplate title="Register">
      <div className="container">
        <h1 className="mb-3">Register</h1>
        <form onSubmit={handleRegister}>
          <InputField
            id="registerName"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          <InputField
            id="registerEmail"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          
          <InputField
            id="registerPassword"
            label="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoComplete="new-password"
          />

          <InputField
            id="passwordConfirmation"
            label="Confirm Password"
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            autoComplete="new-password"
          />
          
          <div className='row align-items-center'>
            <div className="col-md-auto">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Register
              </button>
            </div>
            <div className='col-md my-3 my-md-0 text-md-end text-secondary'>
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