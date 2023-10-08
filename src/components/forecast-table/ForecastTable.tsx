import { ReactElement, useMemo, useState } from 'react';
import { useTable, Column } from 'react-table';
import { formatDate, calculateColumnsPerPage } from '../../utils/helpers';
import styles from './ForecastTable.module.scss';
import ExcelButton from '../excel-button/ExcelButton';
import FiltersButton from '../filters-button/FiltersButton';

interface ForecastData {
  store: string;
  sku: string;
  forecast_date: string;
  forecast: Record<string, number>;
}

type IForecastTableProps = {
  forecasts: ForecastData[];
};

export default function ForecastTable({
  forecasts,
}: IForecastTableProps): ReactElement {
  const data = useMemo(() => forecasts, [forecasts]);
  const [currentPage, setCurrentPage] = useState(0);

  // calculate columns per page
  const forecastDays: number = Object.keys(data[0].forecast).length;
  const columnsPerPage = calculateColumnsPerPage(forecastDays);

  // get columns
  const columns: Column[] = useMemo(() => {
    if (data.length === 0) return [];

    const forecastDates = Object.keys(data[0].forecast);

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

    const forecastColumns: Column[] = forecastDates
      .slice(startIndex, endIndex) // Slice columns based on the current page
      .map((date) => ({
        Header: formatDate(date),
        accessor: `forecast.${date}`,
      }));

    return columnsArray.concat(forecastColumns);
  }, [data, currentPage, columnsPerPage]);

  // pagination variables
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

  // disabled button classes
  const backBtnDisabledClass =
    currentPage === 0 ? styles.pagination__bkBtnDisabled : '';
  const fwdBtnDisabledClass =
    currentPage === Math.ceil(columns.length / columnsPerPage) - 1
      ? styles.pagination__fwdBtnDisabled
      : '';

  // get table props from useTable
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <div className={styles.tableContainer}>
      <div className={styles.controls}>
        <ExcelButton />
        <FiltersButton />
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            type='button'
            className={`${styles.pagination__backBtn} ${backBtnDisabledClass}`}
            aria-label='backBtn'
          />
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(columns.length / columnsPerPage) - 1
            }
            type='button'
            className={`${styles.pagination__fwdBtn} ${fwdBtnDisabledClass}`}
            aria-label='fwdBtn'
          />
        </div>
      </div>

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
