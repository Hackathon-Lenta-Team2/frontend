import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState}  from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "../components/button/button.tsx";
import './login.scss'
import PasswordInput from "../components/inputs/password-input.tsx";
import Checkbox from "../components/checkbox/chechbox.tsx";
import EmailInput from "../components/inputs/email-input.tsx";
import FilterInput from "../components/inputs/filter-input.tsx";


export default function FilterPage(): ReactElement {

	return (
		<div className={'login'}>
			<h2 className={'login__header'}>Войти</h2>
			<form name="filterForm">
				<FilterInput />
			</form>
		</div>
	)
}
