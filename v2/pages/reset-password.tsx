import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head';
import Link from 'next/link';
import InputField from '../components/InputField';

export default function PasswordReset() { 
  const supabase = createClient(
    'https://drslwhfnwkzeyqnmsrnz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyc2x3aGZud2t6ZXlxbm1zcm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1ODM5MjksImV4cCI6MTk4NzE1OTkyOX0.P16qxC6m94Sevw5Asxxspy5Dhtp1vWsA3iUlIvWaYls');

  const [email, setEmail] = useState('');

  async function handlePasswordReset(e) {
    /* todo: better messaging */
    e.preventDefault();
    // resetPasswordEmail(email);
    // todo: extract to a lib function?
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  }

  return (
    <div className="container">
      <Head>
        <title>Reset Password | GameVentory</title>
      </Head>
      <h1 className="mb-3">Reset Password</h1>
      <form onSubmit={handlePasswordReset}>
        <InputField
          id="passwordResetEmail"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        
        <div className="row align-items-center">
          <div className="col-md-auto">
            <button
              className="btn btn-primary"
              type="submit"
            >
              Reset Password
            </button>
          </div>
          <div className="col-md my-3 my-md-0 text-md-end text-secondary">
            Don't have an account? {}
            <Link href="/register">
              Sign Up Today.
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}