import { ReactElement } from 'react';
import styles from './ExcelButton.module.scss';

export default function ExcelButton(): ReactElement {
  return (
    <button type='button' className={styles.btn}>
      Выгрузить в Excel
    </button>
  );
}
