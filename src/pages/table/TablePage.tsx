import { ReactElement } from 'react';
import FactTable from '../../components/fact-table/FactTable';
import ForecastTable from '../../components/forecast-table/ForecastTable';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';
import styles from './TablePage.module.scss';
import * as forecastData from '../../utils/mock-forecast.json';
import * as salesData from '../../utils/mock-actual.json';

export default function TablePage(): ReactElement {
  // TODO: add state for isForecast
  const isForecast: boolean = false;

  // get days
  const days: number = Object.keys(forecastData.data[0].forecast).length;

  return (
    <div className={styles.tablePage}>
      <ResultsHeading days={days} isForecast={isForecast} />
      <ResultsTabs />
      {isForecast ? (
        <ForecastTable forecasts={forecastData.data} />
      ) : (
        <FactTable sales={salesData.data} />
      )}
    </div>
  );
}
