import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSortBy, useTable } from 'react-table';
import { getUserGames, removeGameFromUserCollection } from '../firebase';
import PageTemplate from '../templates/page-template';
import { HiPlus } from 'react-icons/hi';
import { TiArrowUnsorted, TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Loading from '../components/loading';

export default function GamesList() {
  const [games, setGames] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const columns = useMemo(() => [
    {
      Header: 'Game Name',
      accessor: 'name',
    },
    {
      Header: 'Min Players',
      accessor: 'minPlayers',
    },
    {
      Header: 'Max Players',
      accessor: 'maxPlayers',
    },
    {
      Header: 'Min Playtime',
      accessor: 'minPlaytime',
    },
    {
      Header: 'Max Playtime',
      accessor: 'maxPlaytime',
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: games, initialState: { sortBy: [{id: 'name' }]}}, useSortBy);

  useEffect(() => {
    // on mount, fetch game data
    // todo: memoize?
    getUserGames().then(data => {
      setGames(data)
      setIsDataLoading(false);
    });
  }, []);

  if(isDataLoading) return <Loading />;

  if(!games) return;

  const handleRemoveGame = async (id) => {
    /* todo: integrate this with React Table */
    if(!window.confirm('Are you sure you want to delete this game from your collection?')) return;
    setIsDataLoading(true);
    await removeGameFromUserCollection(id);
    const newGameList = [...games].filter(game => game.atlasId !== id);
    setGames(newGameList);
    setIsDataLoading(false);
  }

  return (
    <PageTemplate title="My Games">
      <div className="container">
        <h1>Your Board Game Collection</h1>
        {games.length > 0 ? (<>
          {/* <OldTable games={games} removeGame={handleRemoveGame} /> */}
          <table className="table align-middle" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? <TiArrowSortedUp />
                            : <TiArrowSortedDown />
                        : <TiArrowUnsorted />}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>) : (
          <p>You have no games in your collection.</p>
        )}
        <Link to="/games/add"><HiPlus /> Add a Game to Your Collection</Link>
      </div>
    </PageTemplate>
  );
}

const OldTable = ({ games, removeGame }) => (
  <table className="table align-middle">
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
          <td>
            <button
              className="btn btn-outline-danger"
              title="Remove from your Collection"
              onClick={() => removeGame(game.atlasId)}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)