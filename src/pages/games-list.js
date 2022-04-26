import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../firebase';
import PageTemplate from '../templates/page-template';
import { HiPlus } from 'react-icons/hi';

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
        <Link to="/games/add"><HiPlus /> Add a Game to Your Collection</Link>
      </div>
    </PageTemplate>
  );
}