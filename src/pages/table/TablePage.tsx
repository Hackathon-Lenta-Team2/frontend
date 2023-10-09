import {ReactElement, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/types';
import FactTable from '../../components/fact-table/FactTable';
import ForecastTable from '../../components/forecast-table/ForecastTable';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';
import styles from './TablePage.module.scss';
import * as forecastData from '../../utils/mock-forecast.json';
import {fetchGetForecasts, fetchGetSales} from '../../services/async-thunk/filter-thunk';
import {useDispatch} from '../../services/hooks/useDispatch';
import Loader from '../../components/loader/loader';
import {useParams} from 'react-router-dom';
import NotFound404 from '../not-found';

export default function TablePage(): ReactElement {
  const { dataType } = useParams();
  const isForecast = dataType === 'forecast';
  const sales = useSelector((store: RootState) => store.filter.sales);
  const selectedStores = useSelector((store: RootState) => store.filter.selectedStores);
  const selectedProducts = useSelector((store: RootState) => store.filter.selectedProducts);
  const factStartDate = useSelector((store: RootState) => store.filter.factStartDate);
  const factEndDate = useSelector((store: RootState) => store.filter.factEndDate);
  const forecasts = useSelector((store: RootState) => store.filter.forecasts);
  const forecastStartDate = useSelector((store: RootState) => store.filter.forecastStartDate);
  const forecastEndDate = useSelector((store: RootState) => store.filter.forecastEndDate);

  const startSalesDate = sales.length !== 0 ? sales[0].fact[0].date : '';
  const endSalesDate =
    sales.length !== 0 ? sales[0].fact[sales[0].fact.length - 1].date : '';

  const dispatch = useDispatch();

  useEffect(() => {
    if (isForecast) {
      dispatch(
        fetchGetForecasts({
          stores: selectedStores,
          skus: selectedProducts,
          start_date: forecastStartDate,
          end_date: forecastEndDate,
        })
      );
    } else {
      dispatch(
        fetchGetSales({
          stores: selectedStores,
          skus: selectedProducts,
          date_after: factStartDate,
          date_before: factEndDate,
        })
      );
    }
  }, []);

  // get days
  const days: number = Object.keys(forecastData.data[0].forecast).length;

  if (dataType !== 'fact' && dataType !== 'forecast') return <NotFound404 />;

  if (isForecast) {
    if (!forecasts || !(selectedStores && selectedProducts && forecastStartDate  && forecastEndDate)) {
      return <Loader />;
    }
  } else {
    if (!sales || !(selectedStores && selectedProducts && factStartDate && factEndDate)) {
      return <Loader />;
    }
  }

  return (
    <div className={styles.tablePage}>
      <ResultsHeading
        days={days}
        isForecast={isForecast}
        startDate={startSalesDate}
        endDate={endSalesDate}
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
