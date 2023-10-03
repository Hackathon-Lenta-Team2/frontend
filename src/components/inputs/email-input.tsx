import React, {ReactElement} from 'react';
import './input.scss'


export default function EmailInput(): ReactElement {
	return (
	  <label className={'label'}>Электронная почта
		  <input className={'input'} type="email" name="loginEmail" value="" placeholder="Электронная почта" required minLength="2" maxLength="40"></input>
		  <span className={'message message__error'}>Ошибка</span>
	  </label>
	)
}
