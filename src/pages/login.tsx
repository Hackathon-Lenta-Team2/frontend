import React, {ReactElement, useState} from 'react';
import Button from "../components/button/button.tsx";
import './login.scss'
import '../components/input.scss'
import Checkbox from "../components/checkbox/chechbox.tsx";


export default function LoginPage(): ReactElement {

  const [ isEmailValidated, setEmailValidation ] = useState(true);
  const [ emailError, setEmailError ] = useState (' ');

  const [ isPasswordValidated, setPasswordValidation ] = useState(true);
  const [ passwordError, setPasswordError ] = useState(' ');

  const [form, setValue] = useState({ email: '', password: '' });

  const isEmailEmpty = form.email.length === 0;
  console.log(`form email: ${form.email}`);
  const isPasswordEmpty = form.password.length === 0;

  const setFormValues = e => {
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
		<div className={'login'}>
			<h2 className={'login__header'}>Войти</h2>
			<form name="loginForm">
				<div className={'input-container'}>
					<input className={'input ' + (!isEmailValidated && 'input__error' || '')}
                 type="email"
                 name="loginEmail"
                 required
                 minLength="2"
                 maxLength="40"
                 onChange={e => onFormChange(e, setEmailValidation, setEmailError)}>
          </input>
					<label className={'floating-label ' + (!isEmailEmpty && 'label-on-top' || '')}>Электронная почта</label>
					<span className={'message ' + (!isEmailValidated && 'message__error' || '')}>{emailError}</span>
				</div>
				<div className={'input-container'}>
					<input className={'input ' + (!isPasswordValidated && 'input__error' || '')}
                 type="password"
                 name="loginPassword"
                 required
                 minLength="6"
                 maxLength="20"
                 onChange={e => onFormChange(e, setPasswordValidation, setPasswordError)}>
          </input>
					<label className={'floating-label'}>Пароль</label>
					<span className={'message ' + (!isPasswordValidated && 'message__error' || '')}>{passwordError}</span>
				</div>
				<Checkbox>Запомнить меня</Checkbox>
				<Button type={'submit'}>Войти</Button>
			</form>
		</div>
	)
}
