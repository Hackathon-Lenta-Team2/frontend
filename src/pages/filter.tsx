import React, {ReactElement, useState} from 'react';
import './filter.scss'
import ForecastFilters from "../components/forecast-filters/forecast-filters.tsx";
import ActualFilters from "../components/actual-filters/actual-filters.tsx";

type TabValues = 'Fact' | 'Forecast';

export default function FilterPage(): ReactElement {
		const [tab, setTab] = useState('Fact' as TabValues);
		function onTabClick(newTab) {
			setTab(newTab)
		}

	return (
		<section className={'filter'}>
			<div className={'tab-menu'}>
				<button className={'tab ' + (tab === 'Fact' && 'tab_active' || '')} onClick={() => onTabClick('Fact')}>Факт</button>
				<button className={'tab ' + (tab === 'Forecast' && 'tab_active' || '')} onClick={() => onTabClick('Forecast')}>Прогноз</button>
			</div>
			{ (tab === 'Fact') ? (
				<ActualFilters />
				) : (
				<ForecastFilters />
			)}
		</section>
	)
}
