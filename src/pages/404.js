import { Link } from 'react-router-dom'
import PageTemplate from '../templates/page-template';

export default function NotFoundPage() {
  return (
    <PageTemplate>
      <div className="container">
        <h1>404 Page Not Found</h1>
        <p>Go back to <Link to="/games">your game collection</Link>.</p>
      </div>
    </PageTemplate>
  )
}