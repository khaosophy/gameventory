import { Link } from 'react-router-dom'
import PageTemplate from '../templates/page-template';

export default function Home() {
  return (
    <PageTemplate>
      <div className="container">
        <h1>Hello World!</h1>
        <p>Review <Link to="/games">your board game collection.</Link></p>
      </div>
    </PageTemplate>
  )
}