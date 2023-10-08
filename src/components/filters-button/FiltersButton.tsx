import { ReactElement } from 'react';
import styles from './FiltersButton.module.scss';

export default function FiltersButton(): ReactElement {
  return (
    <button type='button' className={styles.btn}>
      <div className={styles.btn__arrow} />
      Фильтры
      <div className={styles.btn__jar} />
    </button>
  );
}
