import React, {ReactElement} from 'react';
import FilterInput from "../inputs/filter-input.tsx";
import Checkbox from "../checkbox/chechbox.tsx";
import Button from "../button/button.tsx";
import "./forecast-filters.scss"
import NumberInput from "../inputs/number-input.tsx";

export default function ForecastFilters(): ReactElement {
	return (
			<form name="forecast-filters" className={'form'}>
				<FilterInput />
				<FilterInput />
				<NumberInput />
				<Checkbox>Сохранить настройки фильтров</Checkbox>
				<Button>Сформировать</Button>
			</form>
	)
}
