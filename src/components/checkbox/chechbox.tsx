import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState}  from 'react';
import {useNavigate} from 'react-router-dom';
import './checkbox.scss'


export default function Checkbox(): ReactElement {
	return (
		<label className={'checkbox'}>Запомнить меня
			<input className={'checkbox_real'} type="checkbox" name="loginSave"></input>
			<span className={'checkbox_fake'}></span>
		</label>
	)
}
