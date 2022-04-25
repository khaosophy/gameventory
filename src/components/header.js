import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase';

export default function Header() {
  const [user, loading] = useAuthState(auth);
  return (
    <header className="container py-2 d-flex align-items-center justify-content-between">
      <h1 className="logo">
        {/* todo: logo */}
        <Link to="/">
          GameBook
        </Link>
      </h1>
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
    </header>
  )
}