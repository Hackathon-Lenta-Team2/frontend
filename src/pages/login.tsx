import React, { ReactElement, useState } from 'react';
import Button from '../components/button/button.tsx';
import './login.scss';
import '../components/input.scss';
import Checkbox from '../components/checkbox/checkbox.tsx';

export default function LoginPage(): ReactElement {
  const [isEmailValid, setEmailValidation] = useState(true);
  const [emailError, setEmailError] = useState(' ');

  const [isPasswordValid, setPasswordValidation] = useState(true);
  const [passwordError, setPasswordError] = useState(' ');

  const [form, setValue] = useState({ email: '', password: '' });

  const isEmailEmpty = form.email.length === 0;
  const isPasswordEmpty = form.password.length === 0;
  const isFormInvalid = !isEmailValid || !emailError;

  const setFormValues = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function onFormChange(e, setValidation, setErrorMessage) {
    setFormValues(e);
    if (!e.target.validity.valid) {
      setValidation(false);
      setErrorMessage(e.target.validationMessage);
    } else {
      setValidation(true);
      setErrorMessage(' ');
    }
  }

  return (
    <div className='login'>
      <h2 className='login__header'>Войти</h2>
      <form name='loginForm'>
        <div className='input-container'>
          <input
            className={`input ${(!isEmailValid && 'input__error') || ''}`}
            type='email'
            name='email'
            required
            minLength='2'
            maxLength='40'
            placeholder='info@lenta.com'
            onChange={(e) => onFormChange(e, setEmailValidation, setEmailError)}
          />
          <label className='label'>Электронная почта</label>
          <span
            className={`message ${(!isEmailValid && 'message__error') || ''}`}
          >
            {emailError}
          </span>
        </div>
        <div className='input-container'>
          <input
            className={`input ${(!isPasswordValid && 'input__error') || ''}`}
            type='password'
            name='password'
            required
            minLength='6'
            maxLength='20'
            placeholder='********'
            onChange={(e) =>
              onFormChange(e, setPasswordValidation, setPasswordError)
            }
          />
          <label className='label'>Пароль</label>
          <span
            className={`message ${
              (!isPasswordValid && 'message__error') || ''
            }`}
          >
            {passwordError}
          </span>
        </div>
        <Checkbox>Запомнить меня</Checkbox>
        <Button type='submit' disabled={isFormInvalid}>
          Войти
        </Button>
      </form>
    </div>
  );
}
