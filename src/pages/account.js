import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
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
                  <img src="https://placehold.jp/200x200.png" alt="" />
                  <button className="btn btn-link px-0">Set profile image</button>
                </div>
                <div className="col-md-8">
                  <form onSubmit={handleSubmit}>
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
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
