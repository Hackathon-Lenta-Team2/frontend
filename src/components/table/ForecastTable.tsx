import { ReactElement, useMemo, useState } from 'react';
import { useTable, Column } from 'react-table';
import { formatDate } from '../../utils/helpers';
import * as forecastData from '../../utils/mock-forecast.json';
import styles from './ForecastTable.module.scss';

export default function Table(): ReactElement {
  const data = useMemo(() => forecastData.data, []);
  const [currentPage, setCurrentPage] = useState(0);
  const columnsPerPage = 7; // Number of columns to display per page

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

    const startIndex = currentPage * columnsPerPage;
    const endIndex = startIndex + columnsPerPage;

    const forecastColumns: Column[] = forecastKeys
      .slice(startIndex, endIndex) // Slice columns based on the current page
      .map((key) => ({
        Header: formatDate(key),
        accessor: `forecast.${key}`,
      }));

    return columnsArray.concat(forecastColumns);
  }, [data, currentPage]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const nextPage = () => {
    if (currentPage < Math.ceil(columns.length / columnsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div>
      <button onClick={prevPage} disabled={currentPage === 0} type='button'>
        Previous
      </button>
      <button
        onClick={nextPage}
        disabled={
          currentPage === Math.ceil(columns.length / columnsPerPage) - 1
        }
        type='button'
      >
        Next
      </button>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key: headerKey, ...restHeaderProps } =
              headerGroup.getHeaderGroupProps();

            return (
              <tr
                key={headerKey}
                {...restHeaderProps}
                className={styles.table__headerRow}
              >
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...restColumnProps } =
                    column.getHeaderProps();

                  return (
                    <th
                      key={columnKey}
                      {...restColumnProps}
                      className={styles.table__headerCell}
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.table__body}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={styles.table__bodyRow}
                key={row.id}
              >
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td
                      key={key}
                      {...restCellProps}
                      className={styles.table__bodyCell}
                    >
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
