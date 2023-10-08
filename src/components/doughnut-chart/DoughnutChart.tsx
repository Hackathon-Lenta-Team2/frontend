import { ReactElement } from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './DoughnutChart.module.scss';

interface PieChartProps {
  data: { [key: string]: number };
}

export default function DoughnutChart({ data }: PieChartProps): ReactElement {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FFB900',
          '#003C96',
          '#2FCBFF',
          '#00BE64',
          '#4D4D4D',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 25,
          boxHeight: 25,
          padding: 0,
          font: {
            family: 'Futura',
            size: 20,
            weight: '450',
          },
        },
      },
    },
  };

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartsContainer__chart}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className={styles.chartsContainer__chart}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className={styles.chartsContainer__chart}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <div className={styles.chartsContainer__chart}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
