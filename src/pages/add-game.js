import { useState } from 'react';
import { bgSearch } from '../lib/bgatlas';
import PageTemplate from '../templates/page-template';
import InputField from '../components/input-field';
import GameList from '../components/game-list';
import Loading from '../components/loading';

export default function AddGame() {
  const [name, setName] = useState('');
  const [games, setGames] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    /**
     * First, check against the Firebase data. (TODO)
     * If nothing is found, query the Board Game Atlas API
     */
    const { games, count }= await bgSearch(name);
    setGames(games);
    setCount(count);
    setLoading(false);
  }

  if(loading) return <Loading />;

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
              autoFocus
            />
            <button type="submit" className="btn btn-primary">Find</button>
          </div>

          <GameList games={games} count={count} />
        </form>
      </div>
    </PageTemplate>
  )
}