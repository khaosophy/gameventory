
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { addGameToDb, addGameToUser, getUserGameIDs, auth } from '../firebase';
import './game-list.css';

// todo: fetch results from db first, then fetch from Game Atlas
export default function GameList({ games, count }) {
  const [user] = useAuthState(auth);
  const [userGames, setUserGames] = useState([]);
  useEffect(() => {
    /* todo: move this to page level? */
    async function getOwnedGames() {
      const userGameIDs = await getUserGameIDs();
      setUserGames(userGameIDs);
    }
    if(!user) return;
    getOwnedGames();
  }, [user]);

  if (!games) return null;
  if (!games.length) return <p>No games found.</p>

  return (<>
    <p>Showing {count} of {count} games</p>
    <ul className="game-list list-unstyled mt-5">
      {games.map((game) => (
        <GameCard
          key={game.id}
          owned={userGames.includes(game.id)}
          {...{ game }}
        />
      ))}
    </ul>
  </>)
}

export function GameCard({ owned, game }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    min_players: minPlayers,
    max_players: maxPlayers,
    min_playtime: minPlaytime,
    max_playtime: maxPlaytime,
    images,
  } = game;

  const addGameToCollection = async (event, atlasId) => {
    event.preventDefault();
    addGameToDb({
      atlasId,
      name,
      minPlayers,
      maxPlayers,
      minPlaytime,
      maxPlaytime,
    });
    await addGameToUser(atlasId);
    navigate('/games');
  }

  return (
    <li className="game-card bg-white border shadow-sm mb-4 p-2">
      <img className="game-card__image" src={images.small} alt="" />
      <div className="game-card__details">
        <h3 className="game-card__title h5">{name}</h3>
        <div className="game-card__player-range">
          Players: {}
          <span>{minPlayers} - {maxPlayers}</span>
        </div>
        <div className="game-card__time-range">
          Playtime: {}
          <span>{minPlaytime} - {maxPlaytime}</span>
        </div>
      </div>
      <div className="game-card__actions">
        {owned ? (
          <button className="btn btn-secondary" disabled>
            Already Collected
          </button>
        ) : (
        <button 
          className="btn btn-outline-primary"
          onClick={(e) => addGameToCollection(e, id)}
        >
          Add to Collection
        </button>
        )}
        {/* todo: wish list functionality */}
        {/* <button
          className="btn btn-outline-secondary"
          onClick={(e) => e.preventDefault()}
        >
          Add to Wish List
        </button> */}
      </div>
    </li>
  )
}