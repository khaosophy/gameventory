import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputField from '../components/InputField';

export default function Register() {  
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  useEffect(() => {
    if(user) router.push('/')
  }, [user]);

  /* todo: update/change password page */

  async function handleRegister(e) {
    e.preventDefault();
    // todo: confirm passwords?
    // todo: save name to database
    // todo: extract to a lib function and add entry for users name
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      // todo: display error
      return console.error(error);
    }
    if (data.session) {
      return router.push('/');
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-3">Register</h1>
      <form onSubmit={handleRegister}>
        <InputField
          id="registerName"
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />

        <InputField
          id="registerEmail"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        
        <InputField
          id="registerPassword"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <InputField
          id="passwordConfirmation"
          label="Confirm Password"
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          autoComplete="new-password"
        />
        
        <div className='row align-items-center'>
          <div className="col-md-auto">
            <button
              className="btn btn-primary"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className='col-md my-3 my-md-0 text-md-end text-secondary'>
            Already have an account? {}
            <Link href="/login">
              Log in here.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}