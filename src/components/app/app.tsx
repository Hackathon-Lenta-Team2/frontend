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

export default function App() {
  const dispatch = useDispatch();

  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  const init = async () => {
    if (getCookie('token')) {
      await dispatch(fetchGetUser());
    }
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
    dispatch(fetchGetStores());
    dispatch(fetchGetGroups());
    dispatch(fetchGetCategories());
    dispatch(fetchGetSubcategories());
    dispatch(fetchGetProducts());
  });

  return (
    <BrowserRouter>
      <AppHeader />
      {!isUserLoaded ? <p className=''>Загрузка...</p> : <RoutesComponent />}
    </BrowserRouter>
  );
}
