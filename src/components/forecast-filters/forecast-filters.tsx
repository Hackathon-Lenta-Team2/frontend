import React, {ReactElement, useState} from 'react';
import FilterInput from "../filter-input/filter-input.tsx";
import Checkbox from "../checkbox/chechbox.tsx";
import Button from "../button/button.tsx";
import "./forecast-filters.scss"
import "../input.scss"

export default function ForecastFilters(): ReactElement {
  const [ isDaysNumberValid, setDaysNumberValidation ] = useState(true);
  const [ daysNumberError, setDaysNumberError ] = useState ('От 1 до 14 дней');

  const [form, setValue] = useState({ daysNumber: '' });

  const isDaysNumberEmpty = form.daysNumber.length === 0;
  const isFormInvalid = !isDaysNumberValid;

  const setFormValues = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function onFormChange(e) {
    setFormValues(e);
    if (!e.target.validity.valid) {
      setDaysNumberValidation(false);
      setDaysNumberError(e.target.validationMessage);
    } else if (e.target.value > 14) {
      setDaysNumberValidation(false);
      setDaysNumberError('Количество дней не может быть больше 14');
    } else if (e.target.value < 1) {
      setDaysNumberValidation(false);
      setDaysNumberError('Количество дней не может быть меньше 1');
    } else {
      setDaysNumberValidation(true);
      setDaysNumberError('От 1 до 14 дней');
    }
  }

	return (
			<form name="forecast-filters" className={'form'}>
				<FilterInput>Номер ТК</FilterInput>
				<FilterInput>Группа товаров</FilterInput>
				<FilterInput>Категория</FilterInput>
				<FilterInput>Подкатегория</FilterInput>
				<FilterInput>Товар</FilterInput>
				<div className={'input-container number-input'}>
					<input className={'input'}
                 type="number"
                 name="daysNumber"
                 required
                 minLength="1"
                 maxLength="2"
                 onChange={e => onFormChange(e)}>
          </input>
					<label className={'floating-label ' + (!isDaysNumberEmpty && 'label-on-top' || '')}>Количество дней прогноза</label>
					<span className={'message ' + (!isDaysNumberValid && 'message__error' || '')}>{daysNumberError}</span>
				</div>
				<Checkbox>Сохранить настройки фильтров</Checkbox>
				<Button type={'submit'} disabled={isFormInvalid}>Сформировать</Button>
			</form>
	)
}
