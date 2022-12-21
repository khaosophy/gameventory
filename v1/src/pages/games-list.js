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
      Header: 'ID', // this column is hidden, and used just to pass the game ID to the row
      accessor: 'atlasId',
    },
    {
      Header: 'Game Name',
      accessor: 'name',
    },
    {
      Header: 'Players',
      columns: [
        {
          Header: 'min',
          accessor: 'minPlayers',
        },
        {
          Header: 'max',
          accessor: 'maxPlayers',
        },
      ]
    },
    {
      Header: 'Playtime',
      columns: [
        {
          Header: 'min',
          accessor: 'minPlaytime',
        },
        {
          Header: 'max',
          accessor: 'maxPlaytime',
        },
      ]
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ 
    columns,
    data: games,
    initialState: { 
      sortBy: [{id: 'name' }],
      hiddenColumns: ['atlasId']
    }},
    useSortBy,
    hooks => {
      hooks.visibleColumns.push(columns => {
        // add DELETE column to end of table
        return [
          ...columns,
          {
            id: 'delete',
            disableSortBy: true,
            Cell: (({ row }) => {
              return (
                <button
                  className="btn btn-outline-danger"
                  title="Remove from your Collection"
                  onClick={() => handleRemoveGame(row.values.atlasId)}
                >
                  Remove
                </button>
              );
            }),
          },
        ]
      })
    },
  );

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
    if(!window.confirm('Are you sure you want to remove this game from your collection?')) return;
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
          <table className="table align-middle" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => {
                    return (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <TiArrowSortedUp />
                              : <TiArrowSortedDown />
                          : column.canSort 
                            ? <TiArrowUnsorted />
                            : ''}
                        </span>
                      </th>
                    );
                  })}
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