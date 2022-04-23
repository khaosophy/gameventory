import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div className="container">
      <h1 className="mb-3">Register</h1>
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
  );
}