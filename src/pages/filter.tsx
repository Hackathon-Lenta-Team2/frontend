import { ReactElement, useState } from 'react';
import './filter.scss';
import ForecastFilters from '../components/forecast-filters/forecast-filters';
import ActualFilters from '../components/actual-filters/actual-filters';

type TabValues = 'Fact' | 'Forecast';

export default function FilterPage(): ReactElement {
  const [tab, setTab] = useState<TabValues>('Fact');
  function onTabClick(newTab: TabValues) {
    setTab(newTab);
  }

  return (
    <section className='filter'>
      <div className='tab-menu'>
        <button
          type='button'
          className={`tab ${(tab === 'Fact' && 'tab_active') || ''}`}
          onClick={() => onTabClick('Fact')}
        >
          Факт
        </button>
        <button
          type='button'
          className={`tab ${(tab === 'Forecast' && 'tab_active') || ''}`}
          onClick={() => onTabClick('Forecast')}
        >
          Прогноз
        </button>
      </div>
      {tab === 'Fact' ? <ActualFilters /> : <ForecastFilters />}
    </section>
  );
}
