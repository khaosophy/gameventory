export default function GameList({ games, count }) {
  if (!games) return null;
  if (!games.length) return <p>No games found.</p>

  return (<>
    <p>Showing {count} of {count} games</p>
    <ul className="game-list list-unstyled mt-5">
      {games.map((game) => (
        <GameCard
          key={game.id || game.bgAtlasId}
          // owned={userGames.includes(game.id)}
          {...{ game }}
        />
      ))}
    </ul>
  </>)
}

export function GameCard({ owned, game }) {
  const {
    id,
    name,
    minPlayers,
    maxPlayers,
    minPlaytime,
    maxPlaytime,
    image,
  } = game;

  // const addGameToCollection = async (event, atlasId) => {
  //   event.preventDefault();
  //   addGameToDb({
  //     atlasId,
  //     name,
  //     minPlayers,
  //     maxPlayers,
  //     minPlaytime,
  //     maxPlaytime,
  //   });
  //   await addGameToUser(atlasId);
  //   navigate('/games');
  // }

  return (
    <li className="game-card bg-white border shadow-sm mb-4 p-2">
      <img className="game-card__image" src={image} alt="" />
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
      {/* <div className="game-card__actions">
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
        todo: wish list functionality
        <button
          className="btn btn-outline-secondary"
          onClick={(e) => e.preventDefault()}
        >
          Add to Wish List
        </button>
      </div> */}
    </li>
  )
}