import { useMemo } from 'react';
import { useTable } from "react-table";
import PageTemplate from "../templates/page-template";

export default function Table() {
  const columns = useMemo(() => [
    {
      Header: 'Column 1',
      accessor: 'game', // accessor is the "key" in the data
    },
    {
      Header: 'Column 2',
      accessor: 'minPlayers',
    },
  ], []);

  const data = useMemo(() => [
    {
      game: 'Ticket to Ride',
      minPlayers: 3,
      maxPlayers: 5,
    },
    {
      game: 'Noir',
      minPlayers: 2,
      maxPlayers: 9,
    },
  ], []);

  const tableInstance = useTable({ columns, data })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <PageTemplate title="Testing Tables">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
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
      </div>
    </PageTemplate>
  );
}