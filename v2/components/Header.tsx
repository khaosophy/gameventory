import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import logo from '../assets/logo.png';
import Image from 'next/image';

export default function Header() {
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) console.error(error.message);
  }

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
            {/* {user && (
              <li className="nav-item me-3">
                <a href="/account" className="nav-link">Account</a>
              </li>
            )} */}
          </ul>
        </nav>
        <div>
          {user
            ? <button onClick={handleLogout} className="btn btn-outline-secondary">Log out</button>
            : (
              <a href="/login" className="btn btn-primary">
                Log in
              </a>
            )
          }
        </div>
      </div>
    </header>
  )
}