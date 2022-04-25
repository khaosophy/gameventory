import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom'
import { auth, logout } from '../firebase';
import PageTemplate from '../templates/page-template';

export default function Home() {
  const [user, loading] = useAuthState(auth);

  return (
    <PageTemplate>
      <div className="container">
        <h1>Hello World!</h1>
        <p>Review <Link to="/games">your board game collection.</Link></p>
        {user && !loading && (
          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Log out
          </button>
        )}
      </div>
    </PageTemplate>
  )
}