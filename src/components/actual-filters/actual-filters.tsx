import React, { ReactElement, useState } from 'react';
import FilterInput from '../filter-input/filter-input.tsx';
import Button from '../button/button.tsx';
import './actual-filters.scss';
import '../input.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import styled from 'styled-components';
import { addDays, subDays } from 'date-fns';
import Checkbox from '../checkbox/checkbox.tsx';

/* const Styles = styled.div`
  .react-datepicker__close-icon::before,
  .react-datepicker__close-icon::after {
    background-color: transparent;
    color: #003c96;
    font-size: 27px;
    padding-right: 10px;
    font-weight: 450;
  }
`; */

// TODO: date validation?
export default function ActualFilters(): ReactElement {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <form name='actual-filters' className='form'>
      <FilterInput>Номер ТК</FilterInput>
      <FilterInput>Группа товаров</FilterInput>
      <FilterInput>Категория</FilterInput>
      <FilterInput>Подкатегория</FilterInput>
      <FilterInput>Товар</FilterInput>
      <div className='date-container'>
        <div className='date-input-container'>
          <label className='label'>Дата начала периода</label>
          <DatePicker
            className='date-input'
            filterDate={(d) => {
              return new Date() > d;
            }}
            dateFormat='dd.MM.yyyy'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={subDays(new Date('2022-08-01'), 0)}
            maxDate={addDays(new Date('2023-07-18'), 0)}
            openToDate={new Date('2023-06-01')}
            locale={ru}
            placeholderText='01.06.2023'
          />
        </div>
        <div className='date-input-container'>
          <label className='label'>Дата окончания периода</label>
          <DatePicker
            className='date-input'
            dateFormat='dd.MM.yyyy'
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={subDays(new Date('2022-08-01'), 0)}
            maxDate={addDays(new Date('2023-07-18'), 0)}
            openToDate={new Date('2023-07-18')}
            locale={ru}
            placeholderText='10.07.2023'
          />
        </div>
      </div>
      <Checkbox>Сохранить настройки фильтров</Checkbox>
      <Button type='submit'>Сформировать</Button>
    </form>
  );
}
