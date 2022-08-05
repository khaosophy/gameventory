import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, changePassword } from '../firebase';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';

export default function PasswordChange() { 
  const [newPass, setNewPass] = useState('');
  const [user, loading] = useAuthState(auth);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // todo: loading screen?
      return;
    }
    if (!user) navigate('/login');
  }, [user, loading, navigate]);

  async function handlePasswordChange(e) {
    e.preventDefault();
    await changePassword(newPass);
    navigate('/account');
  }

  return (
    <PageTemplate title="Reset Password">
      <div className="container">
        <h1 className="mb-3">Change Password</h1>
        <form onSubmit={async (e) => await handlePasswordChange(e)}>
          <InputField
            id="passwordChangeNew"
            label="New Password"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            autoComplete="new-password"
          />

          {/* {error && (
            <p className="mt-3 text-danger">Error Changing Password: {error.message}</p>
          )} */}
          
          <button
            className="btn btn-primary"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </PageTemplate>
  );
}