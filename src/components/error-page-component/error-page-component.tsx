import { ReactElement } from 'react';
import Button from '../button/button';
import './error-page-component.scss';
import LogoIcon from '../../images/logo.png';

export default function ErrorPageComponent({
  logo,
  headerText,
  buttonText,
  children,
  onClick,
}): ReactElement {
  return (
    <section className='error-section'>
      <div className='error-section__text-container'>
        <h1 className='error-section__header'>{headerText}</h1>
        <p className='error-section__text'>{children}</p>
        <Button type='button' onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      <img src={logo} alt='Лого' />
    </section>
  );
}
