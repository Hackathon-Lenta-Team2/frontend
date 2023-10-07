import { ReactElement } from 'react';
import Table from '../../components/table/ForecastTable';
import ResultsHeading from '../../components/results-heading/ResultsHeading';
import ResultsTabs from '../../components/results-tabs/ResultsTabs';

export default function ResultsPage(): ReactElement {
  return (
    <div className=''>
      <ResultsHeading days={14} />
      <ResultsTabs />
      <Table />
    </div>
  );
}
