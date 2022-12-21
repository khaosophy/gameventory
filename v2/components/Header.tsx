import logo from '../assets/logo.png';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-bottom">
      <div className="container py-2 d-flex align-items-center">
        <a href="/" className="me-auto">
          <Image src={logo} className="logo" alt="GameBook Logo" />
        </a>
        <nav>
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item me-3">
              <a href="/games" className="nav-link">Game Collection</a>
            </li>
            {/* {user && !loading && (
              <li className="nav-item me-3">
                <a href="/account" className="nav-link">Account</a>
              </li>
            )} */}
          </ul>
        </nav>
        <div>
          {/* {!user && !loading && ( */}
          <a href="/login" className="btn btn-primary">
            Login
          </a>
          {/* )} */}
        </div>
      </div>
    </header>
  )
}