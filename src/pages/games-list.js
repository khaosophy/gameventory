import { useState, useEffect } from 'react';
import { getGames } from '../firebase';

export default function GamesList() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getGames().then(data => setGames(data));
  }, []);

  if(!games) return;
  return (
    <div className="container">
      <h1>Board Games!</h1>
      <ul>
        {games.map(game => (
          <li key={game.name}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}