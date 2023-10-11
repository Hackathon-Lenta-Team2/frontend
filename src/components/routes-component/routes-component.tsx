import { Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import FilterPage from '../../pages/filter';
import TablePage from '../../pages/table/TablePage';
import NoResults from '../../pages/no-results';
import DashboardPage from '../../pages/dashboard/DashboardPage';

export default function RoutesComponent(): ReactElement {
  return (
    <Routes>
      {/*  часть маршрутов - защищенная, для демо убрали защиту
  <Route path='/' element={<ProtectedRoute element={<FilterPage />} />} /> */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<FilterPage />} />
      <Route path='/results/table/:dataType' element={<TablePage />} />
      <Route path='/results/dashboard/:dataType' element={<DashboardPage />} />
      <Route path='/no-results' element={<NoResults />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
}
