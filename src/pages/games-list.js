import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserGames } from '../firebase';
import PageTemplate from '../templates/page-template';
import { HiPlus } from 'react-icons/hi';
import Loading from '../components/loading';

export default function GamesList() {
  const [games, setGames] = useState([]);
  const [user, isUserLoading] = useAuthState(auth);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(isUserLoading) return;
    getUserGames().then(data => {
      setGames(data)
      setIsDataLoading(false);
    });
  }, [isUserLoading]);

  if(isUserLoading || isDataLoading) return <Loading />;

  if(!user) navigate('/login'); // todo: not working

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
              <th>Playtime</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.name}>
                <td>{game.name}</td>
                <td>{game.minPlayers} - {game.maxPlayers}</td>
                <td>{game.minPlaytime} - {game.maxPlaytime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/games/add"><HiPlus /> Add a Game to Your Collection</Link>
      </div>
    </PageTemplate>
  );
}