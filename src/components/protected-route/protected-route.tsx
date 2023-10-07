import { Navigate } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { useSelector } from '../../services/hooks/useSelector';

type TProtectedRouteProps = {
  element: ReactElement;
};

export function ProtectedRoute({
  element,
}: TProtectedRouteProps): ReactElement {
  const authToken = useSelector((store) => store.profile.authToken);

  return authToken ? element : <Navigate to='/login' />;
}
