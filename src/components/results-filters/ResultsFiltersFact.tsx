/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, ReactElement, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import styles from './ResultsFiltersFact.module.scss';
import '../input.scss';
import { useSelector } from '../../services/hooks/useSelector';
import { useDispatch } from '../../services/hooks/useDispatch';
import { fetchGetSales } from '../../services/async-thunk/filter-thunk';
import { store } from '../../services/store';
import ResultsInputsComponent from '../results-inputs-component/ResultsInputsComponent';

interface IResultsFiltersFactProps {
  isCalled: boolean;
}

export default function ResultsFiltersFact({
  isCalled,
}: IResultsFiltersFactProps): ReactElement {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(isCalled);
  const filtersOpenClass = isOpen ? '' : styles.formContainer_invisible;

  const stores = useSelector((state) => state.filter.stores);
  const groups = useSelector((state) => state.filter.groups);
  const products = useSelector((state) => state.filter.products);

  const selectedStores = useSelector((state) => state.filter.selectedStores);
  const selectedProducts = useSelector(
    (state) => state.filter.selectedProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleActualFiltersSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setIsSubmitClicked(true);

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

  const handleClose = () => {
    setIsOpen(false);
  };

  const isFormValid =
    !isSubmitClicked ||
    (selectedStores.length > 0 && selectedProducts.length > 0);

  if (stores.length === 0 || groups.length === 0 || products.length === 0) {
    return <p className=''>Загрузка...</p>;
  }
  return (
    <div className={`${styles.formContainer} ${filtersOpenClass}`}>
      <button
        aria-label='close'
        type='button'
        className={styles.formContainer__closeBtn}
        onClick={handleClose}
      />
      <form
        name='actual-filters'
        className={styles.form}
        onSubmit={handleActualFiltersSubmit}
      >
        <ResultsInputsComponent isSubmitClicked={isSubmitClicked} />
        <div className={styles.dateContainer}>
          <div className='date-input-container'>
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
        <Button type='submit' disabled={!isFormValid} onClick={handleClose}>
          Применить
        </Button>
      </form>
    </div>
  );
}
