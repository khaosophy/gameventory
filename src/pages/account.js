import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import md5 from 'md5';
import { Link } from 'react-router-dom';
import { updateUserProfile, getUserProfile, auth, logout } from '../firebase';
import InputField from '../components/input-field';
import PageTemplate from '../templates/page-template';
import Loading from '../components/loading';

export default function Account() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [user, isUserLoading] = useAuthState(auth);

  useEffect(() => {
    // set profile info on load
    async function getProfile() {
      const userId = user?.uid;
      const profile = await getUserProfile(userId);
      if(!profile) return;
      setName(profile.name);
      setLocation(profile.location);
      setIsDataLoading(false);
    }
    getProfile();
  }, [user]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUserProfile(name, location);
  }

  if(isUserLoading || isDataLoading) {
    return <Loading />
  }

  return (
    <PageTemplate title="Account">
      <div className="container">
        <h1>Your Account</h1>

        <div className="row">
          <div className="col-md-8 mb-3">
            <div className="card p-3">
              <h2>Profile</h2>

              <div className="row">
                <div className="col-md-4">
                  <img src={`https://www.gravatar.com/avatar/${md5(user.email)}?size=200`} alt="" />
                  <a href="https://gravatar.com" className="btn btn-link px-0" target="_blank" rel="noreferrer">
                    Set profile image &gt;
                  </a>
                </div>
                <div className="col-md-8">
                  <form onSubmit={handleSubmit}>
                    <InputField
                      id="accountEmail"
                      label="Email"
                      value={user.email}
                      onChange={() => { /* no-op */}}
                      disabled
                    />

                    <InputField
                      id="profileName"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <InputField
                      id="profileLocation"
                      label="Location"
                      placeholder="New York, NY"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />

                    <button type="submit" className="btn btn-primary">Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h2>Other</h2>
              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Log out
              </button>

              <Link className="mt-3" to="/change-password">
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
