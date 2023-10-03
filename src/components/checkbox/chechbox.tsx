import React, {ReactElement} from 'react';
import './checkbox.scss'


export default function Checkbox({children}): ReactElement {
	return (
		<label className={'checkbox'}>{children}
			<input className={'checkbox_real'} type="checkbox" name="loginSave"></input>
			<span className={'checkbox_fake'}></span>
		</label>
	)
}
