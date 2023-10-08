import { ReactElement } from 'react';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';
import BarChart from '../../components/barchart/BarChart';
import styles from './DashboardPage.module.scss';
import * as forecastData from '../../utils/mock-forecast.json';
// import * as salesData from '../../utils/mock-actual.json';

export default function DashboardPage(): ReactElement {
  // TODO: change to state
  const isForecast: boolean = false;

  // get days
  const days: number = Object.keys(forecastData.data[0].forecast).length;

  return (
    <div className={styles.tablePage}>
      <ResultsHeading days={days} isForecast={isForecast} />
      <ResultsTabs />
      {isForecast ? <div /> : <BarChart />}
    </div>
  );
}
