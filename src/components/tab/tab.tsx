import React, {ReactElement, useState} from 'react';
import './tab.scss'

export default function Tab(): ReactElement {

	const [isForecast, setForecast] = useState(false);

	function onTabClick() {
		if (isForecast) {
			setForecast(false);
		} else {
			setForecast(true);
		}

	}

	return (
		<div className={'tab-menu'}>
			<button className={'tab tab_active'} onClick={onTabClick}>Факт</button>
			<button className={'tab'} onClick={onTabClick}>Прогноз</button>
		</div>
	)
}
