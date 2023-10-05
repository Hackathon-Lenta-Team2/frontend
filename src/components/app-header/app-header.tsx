import { Link, NavLink, useLocation } from 'react-router-dom';
import React, { ReactElement, useEffect, useState } from 'react';
import './add-header.scss';
import headerLogo from '../../images/header-logo.png';

export default function AppHeader(): ReactElement {
  const [areLinksHidden, setLinksHidden] = useState(true);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/login') {
      setLinksHidden(true);
    } else {
      setLinksHidden(false);
    }
  }, [location.pathname]);

  return (
    <header className='header'>
      <div>
        <Link to='/'>
          <img src={headerLogo} alt='Логотип' />
        </Link>
      </div>
      {!areLinksHidden && (
        <div className='header__link-container'>
          <Link to='/' className='header__link'>
            Главная
          </Link>
          <Link to='/login' className='header__link'>
            Иванов А. А.
          </Link>
        </div>
      )}
    </header>
  );
}
