import { ReactElement } from 'react';
import { formatDaysWord } from '../../utils/helpers';
import styles from './ResultsHeading.module.scss';

type IResultsHeadingProps = {
  days: number;
};

export default function ResultsHeading({
  days,
}: IResultsHeadingProps): ReactElement {
  return (
    <h2 className={styles.heading}>
      Прогноз спроса на {days} {formatDaysWord(days)}
    </h2>
  );
}
