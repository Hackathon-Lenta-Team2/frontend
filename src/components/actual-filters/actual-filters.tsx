import { FormEvent, ReactElement, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { addDays, subDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import FilterInput from '../filter-input/filter-input';
import Button from '../button/button';
import './actual-filters.scss';
import '../input.scss';
import Checkbox from '../checkbox/checkbox';
import { useSelector } from '../../services/hooks/useSelector';
import { useDispatch } from '../../services/hooks/useDispatch';
import { filterSlice } from '../../services/slices/filter-slice';
import { fetchGetSales } from '../../services/async-thunk/filter-thunk';
import { store } from '../../services/store';

export default function ActualFilters(): ReactElement {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const stores = useSelector((store) => store.filter.stores);
  const groups = useSelector((store) => store.filter.groups);
  const categories = useSelector((store) => store.filter.categories);
  const subcategories = useSelector((store) => store.filter.subcategories);
  const products = useSelector((store) => store.filter.products);

  const selectedStores = useSelector((store) => store.filter.selectedStores);
  const selectedGroups = useSelector((store) => store.filter.selectedGroups);
  const selectedCategories = useSelector(
    (store) => store.filter.selectedCategories
  );
  const selectedSubcategories = useSelector(
    (store) => store.filter.selectedSubcategories
  );
  const selectedProducts = useSelector(
    (store) => store.filter.selectedProducts
  );

  const [isChecked, setChecked] = useState<boolean>(false);

  const userSelectedStoreIds = useSelector(
    (store) => store.filter.selectedStores
  );
  const userSelectedGroupIds = useSelector(
    (store) => store.filter.selectedGroups
  );
  const userSelectedCategoryIds = useSelector(
    (store) => store.filter.selectedCategories
  );
  const userSelectedSubcategoryIds = useSelector(
    (store) => store.filter.selectedSubcategories
  );
  const userSelectedProductIds = useSelector(
    (store) => store.filter.selectedProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleStoreFilterOption(candidate, input) {
    return (
      candidate.data.id.includes(input) ||
      candidate.data.city.includes(input) ||
      candidate.data.division.includes(input)
    );
  }

  const dispatchStores = (selectedStores) =>
    dispatch(filterSlice.actions.selectStores(selectedStores));
  const dispatchGroups = (selectedGroups) =>
    dispatch(filterSlice.actions.selectGroups(selectedGroups));

  function handleCategoryFilterOption(candidate, input) {
    return (
      candidate.data.id.includes(input) &&
      ((userSelectedGroupIds.length === 0 && true) ||
        userSelectedGroupIds.includes(candidate.data.group_id))
    );
  }
  const dispatchCategories = (selectedCategories) =>
    dispatch(filterSlice.actions.selectCategories(selectedCategories));

  function handleSubcategoryFilterOption(candidate, input) {
    return (
      candidate.data.id.includes(input) &&
      ((userSelectedCategoryIds.length === 0 && true) ||
        userSelectedCategoryIds.includes(candidate.data.category_id))
    );
  }
  const dispatchSubcategories = (selectedSubcategories) =>
    dispatch(filterSlice.actions.selectSubcategories(selectedSubcategories));

  function handleProductFilterOption(candidate, input) {
    return (
      candidate.data.id.includes(input) &&
      ((userSelectedSubcategoryIds.length === 0 && true) ||
        userSelectedSubcategoryIds.includes(candidate.data.subcat_id)) &&
      ((userSelectedCategoryIds.length === 0 && true) ||
        userSelectedCategoryIds.includes(candidate.data.cat_id)) &&
      ((userSelectedGroupIds.length === 0 && true) ||
        userSelectedGroupIds.includes(candidate.data.group_id))
    );
  }
  const dispatchProducts = (selectedProducts) =>
    dispatch(filterSlice.actions.selectProducts(selectedProducts));

  if (stores.length === 0 || groups.length === 0) {
    return <p className=''>Загрузка...</p>;
  }

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
        stores: userSelectedStoreIds,
        skus: userSelectedProductIds,
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

  const isFormValid = !isSubmitClicked || (selectedStores.length > 0 && selectedProducts.length > 0);
  return (
    <form
      name='actual-filters'
      className='form'
      onSubmit={handleActualFiltersSubmit}
    >
      <FilterInput
        isRequired={true}
        isSubmitClicked={isSubmitClicked}
        data={stores}
        selectedOptions={selectedStores}
        dispatchSelectedOption={dispatchStores}
        filterOptionFunction={handleStoreFilterOption}
      >
        Номер ТК
      </FilterInput>
      <FilterInput
        data={groups}
        selectedOptions={selectedGroups}
        dispatchSelectedOption={dispatchGroups}
      >
        Группа товаров
      </FilterInput>
      <FilterInput
        data={categories}
        selectedOptions={selectedCategories}
        dispatchSelectedOption={dispatchCategories}
        filterOptionFunction={handleCategoryFilterOption}
      >
        Категория
      </FilterInput>
      <FilterInput
        data={subcategories}
        selectedOptions={selectedSubcategories}
        dispatchSelectedOption={dispatchSubcategories}
        filterOptionFunction={handleSubcategoryFilterOption}
      >
        Подкатегория
      </FilterInput>
      <FilterInput
        isRequired={true}
        isSubmitClicked={isSubmitClicked}
        data={products}
        selectedOptions={selectedProducts}
        dispatchSelectedOption={dispatchProducts}
        filterOptionFunction={handleProductFilterOption}
      >
        Товар
      </FilterInput>
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
      <Button type='submit' disabled={!isFormValid}>Сформировать</Button>
    </form>
  );
}
