import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputField from '../components/InputField';

export default function Login() {
  const router = useRouter();
  const supabase = createClient(
    'https://drslwhfnwkzeyqnmsrnz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyc2x3aGZud2t6ZXlxbm1zcm56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE1ODM5MjksImV4cCI6MTk4NzE1OTkyOX0.P16qxC6m94Sevw5Asxxspy5Dhtp1vWsA3iUlIvWaYls');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // todo: extract to a lib function?
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return console.error(error);
    }
    if (data.session) {
      return router.push('/');
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container">
        <h1 className="mb-3">Login</h1>
        <form onSubmit={handleLogin}>
          <InputField
            id="loginEmail"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
          />

          <InputField
            id="loginPass"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="current-password"
            required
          />
          
          <div className="row align-items-center">
            <div className="col-md-auto">
              <button
                className="btn btn-primary"
                type="submit"
              >
                Log in
              </button>
            </div>
            <div className="col-md-3 my-3 my-md-0">
              <Link href="/reset-password">
                Forgot Password?
              </Link>
            </div>
            <div className="col-md text-md-end">
              Don't have an account? {}
              <Link href="/register">
                Sign Up Today.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}