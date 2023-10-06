import React, { ReactElement } from 'react';
import './checkbox.scss';
import { useLocation } from 'react-router-dom';

export default function Checkbox({ children }): ReactElement {
  let className = 'checkbox ';
  const { pathname } = useLocation();
  if (pathname === '/') {
    className += 'checkbox_on-filter-page';
  }
  return (
    <label className={className}>
      {children}
      <input className='checkbox_real' type='checkbox' name='loginSave' />
      <span className='checkbox_fake' />
    </label>
  );
}
