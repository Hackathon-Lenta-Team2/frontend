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
  // TODO: change isForecast to state
  const isForecast: boolean = false;
  const sales = useSelector((store: RootState) => store.filter.sales);

  // get days
  const days: number = Object.keys(forecastData.data[0].forecast).length;

  return (
    <div className={styles.tablePage}>
      <ResultsHeading days={days} isForecast={isForecast} />
      <ResultsTabs />
      {isForecast ? (
        <ForecastTable forecasts={forecastData.data} />
      ) : (
        <FactTable sales={sales} />
      )}
    </div>
  );
}
