import React, {ReactElement} from 'react';
import Button from "../components/button/button.tsx";
import './login.scss'
import '../components/input.scss'
import Checkbox from "../components/checkbox/chechbox.tsx";


export default function LoginPage(): ReactElement {
	return (
		<div className={'login'}>
			<h2 className={'login__header'}>Войти</h2>
			<form name="loginForm">
				<div className={'input-container'}>
					<input className={'input'} type="email" name="loginEmail" required minLength="2" maxLength="40"></input>
					<label className={'floating-label'}>Электронная почта</label>
					<span className={'message message__error'}>Ошибка</span>
				</div>
				<div className={'input-container'}>
					<input className={'input'} type="password" name="loginPassword" required minLength="6" maxLength="20"></input>
					<label className={'floating-label'}>Пароль</label>
					<span className={'message message__success'}>Успех</span>
				</div>
				<Checkbox>Запомнить меня</Checkbox>
				<Button type={'submit'}>Войти</Button>
			</form>
		</div>
	)
}
