import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/types';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';
import DoughnutChart from '../../components/doughnut-chart/DoughnutChart';
import BarChart from '../../components/barchart/BarChart';
import styles from './DashboardPage.module.scss';
import * as forecastData from '../../utils/mock-forecast.json';
// import * as salesData from '../../utils/mock-actual.json';

export default function DashboardPage(): ReactElement {
  const sales = useSelector((state: RootState) => state.filter.sales);
  const startDate = sales.length !== 0 ? sales[0].fact[0].date : '';
  const endDate =
    sales.length !== 0 ? sales[0].fact[sales[0].fact.length - 1].date : '';

  const isForecast: boolean = sales.length === 0;

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
        <DoughnutChart forecasts={forecastData.data} />
      ) : (
        <BarChart />
      )}
    </div>
  );
}
