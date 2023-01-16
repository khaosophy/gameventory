import { useState } from 'react';
import Head from 'next/head';
import InputField from '../components/InputField';
import GameList from '../components/GameList';
import Loading from '../components/Loading';

export default function AddGame() {
  const [name, setName] = useState('');
  const [games, setGames] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/games/lookup?name=${name}`);
    const games = await res.json();
    setGames(games);
    setCount(games.length);
    setLoading(false);
  }

  if(loading) return <Loading />;

  return (
    <div className="container">
      <Head>
        <title>Grow My Collection</title>
      </Head>
      <h1 className="mb-4">Add a Game to Your Collection</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <InputField
            id="searchGameName"
            label="Search by Game Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disableMargin
            autoFocus
          />
          <button type="submit" className="btn btn-primary">Find</button>
        </div>

        <GameList games={games} count={count} />
      </form>
    </div>
  )
}