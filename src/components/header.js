import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';

import logo from '../assets/logo.png';

export default function Header() {
  const [user, loading] = useAuthState(auth);
  return (
    <header className="border-bottom">
      <div className="container py-2 d-flex align-items-center justify-content-between">
        <Link to="/">
          <img src={logo} className="logo" alt="GameBook Logo" />
        </Link>
        <nav></nav>
        <div>
          {user && !loading ? (
            <button
              className="btn btn-danger"
              onClick={logout}
            >
              Log out
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}