import React, {ReactElement} from 'react';
import './input.scss'


export default function NumberInput(): ReactElement {
	return (
		<label className={'label'}>Количество дней прогноза
			<input className={'input'} type="number" value="" placeholder="Количество дней прогноза" required minLength="1" maxLength="2"></input>
			<span className={'message message__error'}>Ошибка</span>
		</label>
	)
}
