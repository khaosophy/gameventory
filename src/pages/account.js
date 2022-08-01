import { useState, useEffect } from 'react';
import InputField from '../components/input-field';
import PageTemplate from '../templates/page-template';

export default function Account() {
  const [name, setName] = useState('');

  useEffect(() => {
    // set profile info on load
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

                    <button type="submit" className="btn btn-primary">Update</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h2>Other</h2>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  )
}
