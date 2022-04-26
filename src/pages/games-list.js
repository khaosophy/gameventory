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
        <table className="table">
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Number of Players</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.name}>
                <td>{game.name}</td>
                <td>{game.minPlayers} - {game.maxPlayers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageTemplate>
  );
}