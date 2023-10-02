import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState}  from 'react';
import {useNavigate} from 'react-router-dom';
import './input.scss'


export default function DateInput(): ReactElement {
	return (
		<label className={'label'}>Дата
			<input className={'input'} type="date" name="realDate" value="" placeholder="" requiredс></input>
			<span className={'message message__error'}>Ошибка</span>
		</label>
	)
}
