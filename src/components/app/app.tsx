import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './app.css';
import RoutesComponent from '../routes-component/routes-component';
import AppHeader from '../app-header/app-header';
import { useDispatch } from '../../services/hooks/useDispatch';
import {
  fetchGetCategories,
  fetchGetGroups,
  fetchGetProducts,
  fetchGetStores,
  fetchGetSubcategories,
} from '../../services/async-thunk/filter-thunk';
import { getCookie } from '../../utils/helpers';
import { fetchGetUser } from '../../services/async-thunk/auth-thunk';
import { filterSlice } from '../../services/slices/filter-slice';

export default function App() {
  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  function loadLocalStorage() {
    dispatch(
      filterSlice.actions.selectStores(
        JSON.parse(window.localStorage.getItem('stores') || '[]')
      )
    );
    dispatch(
      filterSlice.actions.selectGroups(
        JSON.parse(window.localStorage.getItem('groups') || '[]')
      )
    );
    dispatch(
      filterSlice.actions.selectCategories(
        JSON.parse(window.localStorage.getItem('categories') || '[]')
      )
    );
    dispatch(
      filterSlice.actions.selectSubcategories(
        JSON.parse(window.localStorage.getItem('subcategories') || '[]')
      )
    );
    dispatch(
      filterSlice.actions.selectProducts(
        JSON.parse(window.localStorage.getItem('products') || '[]')
      )
    );
  }

  const init = async () => {
    if (getCookie('token')) {
      await dispatch(fetchGetUser());
    }
    await dispatch(fetchGetStores());
    await dispatch(fetchGetGroups());
    await dispatch(fetchGetCategories());
    await dispatch(fetchGetSubcategories());
    await dispatch(fetchGetProducts());
    loadLocalStorage();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <AppHeader />
      {!isUserLoaded ? <p className=''>Загрузка...</p> : <RoutesComponent />}
    </BrowserRouter>
  );
}
