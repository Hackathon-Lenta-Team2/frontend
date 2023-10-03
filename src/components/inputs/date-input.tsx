import React, {ReactElement} from 'react';
import './input.scss'


export default function DateInput(): ReactElement {
	return (
		<label className={'label'}>Дата начала периода
			<input className={'input'} type="date" name="realDate" value="" placeholder="Дата начала периода" required></input>
			<span className={'message message__error'}>Ошибка</span>
		</label>
	)
}
