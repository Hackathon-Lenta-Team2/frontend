import React, {ChangeEvent, FormEvent, ReactElement, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "../components/button/button.tsx";
import './login.scss'
import PasswordInput from "../components/inputs/password-input.tsx";
import Checkbox from "../components/checkbox/chechbox.tsx";
import EmailInput from "../components/inputs/email-input.tsx";


export default function LoginPage(): ReactElement {

	const [form, setValue] = useState({email: '', password: ''});

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setValue({...form, [e.target.name]: e.target.value});
	};

	const navigate = useNavigate();

	const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		navigate(-1);
	};


	return (
		<div className={'login'}>
			<h2 className={'login__header'}>Войти</h2>
			<form name="loginForm">
				<EmailInput />
				<PasswordInput />
				<Checkbox>Запомнить меня</Checkbox>
				<Button>Войти</Button>
			</form>
		</div>
	)
}
