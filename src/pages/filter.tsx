import React, {ReactElement, useState} from 'react';
import './filter.scss'
import ForecastFilters from "../components/forecast-filters/forecast-filters.tsx";
import ActualFilters from "../components/actual-filters/actual-filters.tsx";
import Tab from "../components/tab/tab.tsx";


export default function FilterPage(): ReactElement {

	const [isForecast, setForecast] = useState(false);

	function onTabClick() {
		if (isForecast) {
			setForecast(false);
		} else {
			setForecast(true);
		}

	}

	return (
		<section className={'filter'}>
			<Tab />
				{!isForecast ? (
					<ActualFilters />
					) : (
					<ForecastFilters />
				)}
		</section>
	)
}
