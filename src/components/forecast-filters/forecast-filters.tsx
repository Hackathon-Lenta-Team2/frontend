import React, {ReactElement} from 'react';
import FilterInput from "../filter-input/filter-input.tsx";
import Checkbox from "../checkbox/chechbox.tsx";
import Button from "../button/button.tsx";
import "./forecast-filters.scss"
import "../input.scss"

export default function ForecastFilters(): ReactElement {
	return (
			<form name="forecast-filters" className={'form'}>
				<FilterInput>Номер ТК</FilterInput>
				<FilterInput>Группа товаров</FilterInput>
				<FilterInput>Категория</FilterInput>
				<FilterInput>Подкатегория</FilterInput>
				<FilterInput>Товар</FilterInput>
				<div className={'input-container number-input'}>
					<input className={'input'} type="number" name="forecastDays" required minLength="1" maxLength="2"></input>
					<label className={'floating-label'}>Количество дней прогноза</label>
					<span className={'message'}> От 1 до 14 дней</span>
				</div>
				<Checkbox>Сохранить настройки фильтров</Checkbox>
				<Button type={'submit'}>Сформировать</Button>
			</form>
	)
}
