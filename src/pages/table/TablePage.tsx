import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';
import FactTable from '../../components/fact-table/FactTable';
import ForecastTable from '../../components/forecast-table/ForecastTable';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';
import styles from './TablePage.module.scss';
import * as forecastData from '../../utils/mock-forecast.json';

export default function TablePage(): ReactElement {
  const sales = useSelector((state: RootState) => state.filter.sales);
  const startDate = sales.length !== 0 ? sales[0].fact[0].date : '';
  const endDate =
    sales.length !== 0 ? sales[0].fact[sales[0].fact.length - 1].date : '';

  const isForecast: boolean = sales.length === 0;

  const forecasts = useSelector((state: RootState) => state.filter.forecasts);
  console.log(forecasts);

  // get days
  const days: number = Object.keys(forecastData.data[0].forecast).length;

  return (
    <div className={styles.tablePage}>
      <ResultsHeading
        days={days}
        isForecast={isForecast}
        startDate={startDate}
        endDate={endDate}
      />
      <ResultsTabs />
      {isForecast ? (
        <ForecastTable forecasts={forecastData.data} />
      ) : (
        <FactTable sales={sales} />
      )}
    </div>
  );
}
