import { FormEvent, ReactElement, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import './actual-filters.scss';
import '../input.scss';
import Checkbox from '../checkbox/checkbox';
import { useSelector } from '../../services/hooks/useSelector';
import { useDispatch } from '../../services/hooks/useDispatch';
import { filterSlice } from '../../services/slices/filter-slice';
import { fetchGetSales } from '../../services/async-thunk/filter-thunk';
import { store } from '../../services/store';
import FilterInputsComponent from '../filter-inputs-component/filter-inputs-component';

export default function ActualFilters(): ReactElement {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(false);

  const stores = useSelector((state) => state.filter.stores);
  const groups = useSelector((state) => state.filter.groups);
  const products = useSelector((state) => state.filter.products);

  const selectedStores = useSelector((state) => state.filter.selectedStores);
  const selectedProducts = useSelector((state) => state.filter.selectedProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onCheckboxChange() {
    setChecked(!isChecked);
  }

  function handleActualFiltersSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setIsSubmitClicked(true);
    if (isChecked) {
      dispatch(filterSlice.actions.saveToLocalStorage());
    }
    dispatch(
      fetchGetSales({
        stores: selectedStores,
        skus: selectedProducts,
        date_after: startDate,
        date_before: endDate,
      })
    ).then(() => {
      const { getSalesError } = store.getState().filter;
      if (getSalesError) {
        console.log('Get sales error');
      } else {
        navigate('/results/table');
      }
    });
  }

  const isFormValid =
    !isSubmitClicked ||
    (selectedStores.length > 0 && selectedProducts.length > 0);

  if (stores.length === 0 || groups.length === 0 || products.length === 0) {
    return <p className=''>Загрузка...</p>;
  }
  return (
    <form
      name='actual-filters'
      className='form'
      onSubmit={handleActualFiltersSubmit}
    >
      <FilterInputsComponent isSubmitClicked={isSubmitClicked} />
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
            placeholderText='01.07.2023'
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
      <Checkbox onChange={onCheckboxChange}>
        Сохранить настройки фильтров
      </Checkbox>
      <Button type='submit' disabled={!isFormValid}>
        Сформировать
      </Button>
    </form>
  );
}
