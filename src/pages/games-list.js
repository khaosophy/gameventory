import { useState, useEffect } from 'react';
import { getGames } from '../firebase';
import PageTemplate from '../templates/page-template';

export default function GamesList() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getGames().then(data => setGames(data));
  }, []);

  if(!games) return;
  return (
    <PageTemplate>
      <div className="container">
        <h1>Board Games!</h1>
        <ul>
          {games.map(game => (
            <li key={game.name}>{game.name}</li>
          ))}
        </ul>
      </div>
    </PageTemplate>
  );
}