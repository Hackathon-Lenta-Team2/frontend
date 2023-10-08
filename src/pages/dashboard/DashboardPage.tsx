import { ReactElement } from 'react';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';
import DoughnutChart from '../../components/doughnut-chart/DoughnutChart';
import BarChart from '../../components/barchart/BarChart';
import styles from './DashboardPage.module.scss';
import * as forecastData from '../../utils/mock-forecast.json';
// import * as salesData from '../../utils/mock-actual.json';

export default function DashboardPage(): ReactElement {
  // TODO: change to state
  const isForecast: boolean = true;

  // get days
  const days: number = Object.keys(forecastData.data[0].forecast).length;

  const data = {
    sales1: 15,
    sales2: 20,
    sales3: 30,
    sales4: 10,
    sales5: 70,
  };

  return (
    <div className={styles.tablePage}>
      <ResultsHeading days={days} isForecast={isForecast} />
      <ResultsTabs />
      {isForecast ? <DoughnutChart data={data} /> : <BarChart />}
    </div>
  );
}
