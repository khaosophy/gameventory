import Head from 'next/head';

// Create a single supabase client for interacting with your database
import { createClient } from '@supabase/supabase-js';


export default function Home({ data }) {
  console.log(data);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container">
        <ul>
          {data.map(game => <li key={game.id}>{game.name}</li>)}
        </ul>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const supabase = createClient(process.env.DB_URL, process.env.DB_API_KEY);
  // todo: return games
  const { data, error } = await supabase
    .from('games')
    .select();

  if(error) {
    // todo: throw error on page
    console.error(error.message);
  }

  return {
    props: { data },
  }
}