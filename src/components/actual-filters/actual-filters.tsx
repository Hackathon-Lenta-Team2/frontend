import React, {ReactElement, useState} from 'react';
import FilterInput from "../filter-input/filter-input.tsx";
import Checkbox from "../checkbox/chechbox.tsx";
import Button from "../button/button.tsx";
import "./actual-filters.scss";
import "../input.scss"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import styled from "styled-components";

const Styles = styled.div`
		.react-datepicker__close-icon::before,
		.react-datepicker__close-icon::after {
			background-color: transparent;
			color: #003C96;
			font-size: 27px;
			padding-right: 10px;
		}
`;

export default function ActualFilters(): ReactElement {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	return (
		<form name="actual-filters" className={'form'}>
			<FilterInput>Номер ТК</FilterInput>
			<FilterInput>Группа товаров</FilterInput>
			<FilterInput>Категория</FilterInput>
			<FilterInput>Подкатегория</FilterInput>
			<FilterInput>Товар</FilterInput>
			<div className={'date-container'}>
				<Styles>
					<div className={'date-input-container'}>
						<label className={'date-label'}>Дата начала периода</label>
						<DatePicker
							className={'date-input'}
							filterDate={d => {
								return new Date() > d;
							}}
							dateFormat="dd.MM.yyyy"
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							locale={ru}
							isClearable={true}
						/>
					</div>
				</Styles>
				<Styles>
					<div className={'date-input-container'}>
						<label className={'date-label'}>Дата окончания периода</label>
						<DatePicker
							className={'date-input'}
							filterDate={d => {
								return new Date() > d;
							}}
							dateFormat="dd.MM.yyyy"
							selected={endDate}
							onChange={(date) => setEndDate(date)}
							locale={ru}
							isClearable={true}
						/>
					</div>
				</Styles>
			</div>
			<Checkbox>Сохранить настройки фильтров</Checkbox>
			<Button type={'submit'}>Сформировать</Button>
		</form>
	)
}
