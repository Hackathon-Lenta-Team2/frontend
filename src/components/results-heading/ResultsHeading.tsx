import { ReactElement } from 'react';
import { formatDaysWord } from '../../utils/helpers';
import styles from './ResultsHeading.module.scss';

type IResultsHeadingProps = {
  days: number;
  isForecast: boolean;
};

export default function ResultsHeading({
  days,
  isForecast,
}: IResultsHeadingProps): ReactElement {
  const heading: string = isForecast
    ? `Прогноз спроса на ${days} ${formatDaysWord(days)}`
    : `Качество спроса на ${days} ${formatDaysWord(days)}`;

  return <h2 className={styles.heading}>{heading}</h2>;
}
