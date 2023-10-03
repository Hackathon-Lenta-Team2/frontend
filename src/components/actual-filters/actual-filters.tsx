import React, {ReactElement} from 'react';
import FilterInput from "../inputs/filter-input.tsx";
import DateInput from "../inputs/date-input.tsx";
import Checkbox from "../checkbox/chechbox.tsx";
import Button from "../button/button.tsx";
import "./actual-filters.scss";


export default function ActualFilters(): ReactElement {
	return (
		<form name="factual-filters">
			<FilterInput />
			<FilterInput />
			<div className={'date-container'}>
				<DateInput />
				<DateInput />
			</div>
			<Checkbox>Сохранить настройки фильтров</Checkbox>
			<Button>Сформировать</Button>
		</form>
	)
}
