import { useState } from 'react';
import { bgSearch } from '../lib/bgatlas';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';

export default function AddGame() {
  /* todo: loading state (after form submit, before data shows) */
  const [name, setName] = useState('');
  const [games, setGames] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    /**
     * First, check against the Firebase data. (TODO)
     * If nothing is found, query the Board Game Atlas API
     */
    const games = await bgSearch(name);
    setGames(games);
  }

  return (
    <PageTemplate>
      <div className="container">
        <h1 className="mb-4">Add a Game to Your Collection</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <InputField
              id="searchGameName"
              label="Search by Game Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disableMargin
            />
            <button type="submit" className="btn btn-primary">Find</button>
          </div>

          <GameList games={games} />
        </form>
      </div>
    </PageTemplate>
  )
}

function GameList({ games }) {
  if (!games) return null;
  if (!games.length) return <p>No games found.</p>
  return (
    <ul className="game-list">
      {games.map((game) => <li key={game.id}>{game.name}</li>)}
    </ul>
  )
}