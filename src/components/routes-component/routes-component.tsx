import { Route, Routes } from 'react-router-dom';
import { ReactElement } from 'react';
import NotFound404 from '../../pages/not-found';
import HomePage from '../../pages/home';

export default function RoutesComponent(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}
