import './game-list.css';

export default function GameList({ games }) {
  if (!games) return null;
  if (!games.length) return <p>No games found.</p>
  return (
    <ul className="game-list list-unstyled mt-5">
      {games.map((game) => <GameCard {...{ game }} />)}
    </ul>
  )
}

export function GameCard({ game }) {
  console.log(game);
  const {
    id,
    name,
    min_players: minPlayers,
    max_players: maxPlayers,
    min_playtime: minPlayTime,
    max_playtime: maxPlaytime,
    images,
  } = game;
  return (
    <li key={id} className="game-card border shadow-sm mb-4 p-2">
      <img className="game-card__image" src={images.small} alt="" />
      <div className="game-card__details">
        <h3 className="game-card__title h5">{name}</h3>
        <div className="game-card__player-range">
          Players: {}
          <span>{minPlayers} - {maxPlayers}</span>
        </div>
        <div className="game-card__time-range">
          Playtime: {}
          <span>{minPlayTime} - {maxPlaytime}</span>
        </div>
      </div>
      <div className="game-card__actions">
        <button className="btn btn-outline-primary">Add to Collection</button>
        <button className="btn btn-outline-secondary">Add to Wish List</button>
      </div>
    </li>
  )
}