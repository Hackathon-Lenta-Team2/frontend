import { ReactElement, useMemo } from 'react';
import { useTable, Column } from 'react-table';
import * as forecastData from '../../utils/mock-forecast.json';

export default function Table(): ReactElement {
  const data = useMemo(() => forecastData.data, []);
  const columns: Column[] = useMemo(() => {
    if (data.length === 0) return [];

    const forecastKeys = Object.keys(data[0].forecast);

    const columnsArray: Column[] = [
      {
        Header: 'ТК',
        accessor: 'store',
      },
      {
        Header: 'SKU',
        accessor: 'sku',
      },
    ];

    const forecastColumns: Column[] = forecastKeys.map((key) => ({
      Header: key,
      accessor: `forecast.${key}`,
    }));

    return columnsArray.concat(forecastColumns);
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key: headerKey, ...restHeaderProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <tr key={headerKey} {...restHeaderProps} className='table-row'>
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...restColumnProps } =
                    column.getHeaderProps();

                  return (
                    <th
                      key={columnKey}
                      {...restColumnProps}
                      className='table-header'
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className='table-body'>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='table-row' key={row.id}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps} className='table-cell'>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    /* eslint-enable react/jsx-props-no-spreading */
  );
}
