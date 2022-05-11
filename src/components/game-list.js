import { addGameToDb, addGameToUser } from '../firebase';
import './game-list.css';

// todo: fetch results from db first, then fetch from Game Atlas
export default function GameList({ games }) {
  if (!games) return null;
  if (!games.length) return <p>No games found.</p>
  return (
    <ul className="game-list list-unstyled mt-5">
      {games.map((game) => <GameCard key={game.id} {...{ game }} />)}
    </ul>
  )
}

export function GameCard({ game }) {
  const {
    id,
    name,
    min_players: minPlayers,
    max_players: maxPlayers,
    min_playtime: minPlaytime,
    max_playtime: maxPlaytime,
    images,
  } = game;

  const addGameToCollection = (event, atlasId) => {
    event.preventDefault();    
    addGameToDb({
      atlasId,
      name,
      minPlayers,
      maxPlayers,
      minPlaytime,
      maxPlaytime,
    });
    addGameToUser(atlasId);
  }

  return (
    <li className="game-card border shadow-sm mb-4 p-2">
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
        <button 
          className="btn btn-outline-primary"
          onClick={(e) => addGameToCollection(e, id)}
        >
          {/* todo: if already in collection? */}
          Add to Collection
        </button>
        {/* todo: wish list functionality */}
        <button
          className="btn btn-outline-secondary"
          onClick={(e) => e.preventDefault()}
        >
          Add to Wish List
        </button>
      </div>
    </li>
  )
}