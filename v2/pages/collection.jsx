
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

export default function CollectionPage() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function loadGames() {
      const { data, error } = await supabase.from('games').select();
      if(error) return console.error(error.message);
      setGames(data);
    }

    if(!user) router.push('/login');
    if(user) loadGames();
  }, [user]);

  return (
    <>
      <Head>
        <title>GameVentory</title>
      </Head>
      
      <div className="container">
        {games.length === 0 
          ? <Loading />
          : (<>
            <ul>
              {games.map(game => <li key={game.id}>{game.name}</li>)}
            </ul>
            <Link href="/add-game" className='btn btn-primary'>Add Game</Link>
          </>)
        }
        
      </div>
    </>
  )
}
