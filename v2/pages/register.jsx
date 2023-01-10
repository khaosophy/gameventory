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

  useEffect(() => {
    console.log(user);
    if(user) router.push('/')
  }, [user]);

  /* todo: update/change password page */

  async function handleRegister(e) {
    e.preventDefault();
    // todo: extract to a lib function and add entry for users name
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      // todo: display error
      return console.error(signUpError);
    }

    console.log(signUpData);
    
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').slice(1);

    // todo: save name to database. this didn't work...
    const { error: dbError } = await supabase
      .from('profiles')
      .insert({
        id: signUpData.id,
        firstName,
        lastName,
      })

    if (dbError) return console.error(dbError);

    if (signUpData.session) {
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