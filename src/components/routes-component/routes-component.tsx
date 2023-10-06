import { Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';
import NotFound404 from '../../pages/not-found';
import LoginPage from '../../pages/login';
import FilterPage from '../../pages/filter';
import ResultsPage from '../../pages/results/results';
import NoResults from '../../pages/no-results';

export default function RoutesComponent(): ReactElement {
  return (
    <Routes>
      <Route path='/' element={<FilterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/results' element={<ResultsPage />} />
      <Route path='/no-results' element={<NoResults />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  );
}
