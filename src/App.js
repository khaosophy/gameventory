import { useEffect, useState } from 'react';
import { getGames } from './firebase';

function App() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    getGames().then(data => setGames(data));
  }, []);
  console.log(games);

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

export default App;
