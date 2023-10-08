import { ReactElement } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ResultsTabs.module.scss';

export default function ResultsTabs(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTableBtnClass =
    location.pathname === '/results/table'
      ? styles.resultsTabs__btn_active
      : '';
  const activeDashboardBtbClass =
    location.pathname === '/results/dashboard'
      ? styles.resultsTabs__btn_active
      : '';

  const handleTableBtnClick = (): void => {
    navigate('/results/table');
  };

  const handleDashboardBtnClick = (): void => {
    navigate('/results/dashboard');
  };

  return (
    <div className={styles.resultsTabs}>
      <button
        className={`${styles.resultsTabs__btn} ${activeTableBtnClass}`}
        type='button'
        onClick={handleTableBtnClick}
      >
        Таблица
      </button>
      <button
        className={`${styles.resultsTabs__btn} ${activeDashboardBtbClass}`}
        type='button'
        onClick={handleDashboardBtnClick}
      >
        Дашборд
      </button>
    </div>
  );
}
