import React, {ReactElement} from 'react';
import './input.scss'


export default function PasswordInput(): ReactElement {
	return (
		<label className={'label'}>Пароль
			<input className={'input'} type="password" name="loginPassword" value="" placeholder="Пароль" required minLength="6" maxLength="20"></input>
			<span className={'message message__success'}>Успех</span>
		</label>
	)
}
