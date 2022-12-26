import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head';
import Link from 'next/link';
import InputField from '../components/InputField';

export default function Register() {  
  const supabase = createClient(
    'https://drslwhfnwkzeyqnmsrnz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyc2x3aGZud2t6ZXlxbm1zcm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1ODM5MjksImV4cCI6MTk4NzE1OTkyOX0.P16qxC6m94Sevw5Asxxspy5Dhtp1vWsA3iUlIvWaYls');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  /* todo: update/change password page */

  async function handleRegister(e) {
    e.preventDefault();
    // todo: confirm passwords?
    // registerWithEmailAndPassword(name, email, pass);
    // todo: extract to a lib function and add entry for users name
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
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