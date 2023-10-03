import { ReactElement } from 'react';
import BarChart from '../components/barchart/BarChart';
import Table from '../components/table/Table';

export default function DashboardPage(): ReactElement {
  return (
    <div>
      <Table />
      <BarChart />
    </div>
  );
}
