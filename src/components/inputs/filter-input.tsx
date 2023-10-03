import React, {ReactElement, useState} from 'react';
import '../checkbox/checkbox.scss';
import makeAnimated from "react-select/animated";
import {components, default as ReactSelect} from "react-select";
import searchIcon from "../../images/search-icon.svg";
import downIcon from "../../images/indicator-icon-down.svg";
import upIcon from "../../images/indicator-icon-up.svg";
import deleteIcon from "../../images/multi-val-delete-icon.svg";
import './input.scss'

const colourOptions = [
	{ value: "ocean1", label: "Ocean" },
	{ value: "blue", label: "Blue" },
	{ value: "purple", label: "Purple" },
	{ value: "red", label: "Red" },
	{ value: "orange", label: "Orange" },
	{ value: "yellow", label: "Yellow" },
	{ value: "green", label: "Green" },
	{ value: "forest", label: "Forest" },
	{ value: "slate", label: "Slate" },
	{ value: "silver", label: "Silver" }
];

const colourStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#F0FBFF',
		border: 0,
		borderRadius: 0,
		padding: '0 16px 0 8px',
		height: '56px',
		boxShadow: 'none'
	}),
	placeholder: (styles) => ({
		...styles,
		color: '#003C96',
		fontSize: '20px'
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		backgroundColor: 0,
		width: '4px',
	}),

	menu: (styles, { isFocused }) => ({
		...styles,
		margin: 0,
		border: 0,
		backgroundColor: '#F0FBFF',
		boxShadow: 0,
	}),

	menuList: (styles, { isFocused }) => ({
		...styles,
		margin: 0,
		border: 0,
		backgroundColor: '#F0FBFF',
		maxHeight: '235px',
	}),

	option: (styles) => ({
		...styles,
		backgroundColor: '#F0FBFF',
		color: 'black',
		':hover': {
			boxShadow: '0 0 10px #173C9126'
		}
	}),

	input: (styles, { isSelected }) => ({
		...styles,
/*		borderBottom: isSelected ? 0 : '1px solid #003C96',*/

	}),

	multiValue: (styles) => ({
		...styles,
		backgroundColor: 'white',
		borderRadius: 0,
		boxShadow: '0 0 10px #173C9126',
	}),

	multiValueRemove: (styles) => ({
		...styles,
		borderRadius: 0,
		padding: '0 6px',
		':hover': {
			backgroundColor: 'rgba(0, 60, 150, 0.2)',
		}
	}),

}

const placeholderElement =
	(<div className={'placeholder'}>
			<img src={searchIcon} alt="Поиск" width="18px" height="18px"></img>
			<span>Номер ТК</span>
		</div>)

const MySelect = props => {
		return (
			<ReactSelect
				{...props}
				options={[...props.options]}
				onChange={selected => props.onChange(selected)}
				styles={colourStyles}
				placeholder={placeholderElement}
			/>
		);
};

const Option = props => {
	return (
		<div>
			<components.Option {...props}>
				{/*<input
					type="checkbox"
					checked={props.isSelected}
					onChange={() => null}
				/>{" "}
				<label>{props.label}</label>*/}

				<label className={'checkbox'}>
					<input className={'checkbox_real'}
								 type="checkbox"
								 name="loginSave"
								 checked={props.isSelected}
								 onChange={() => null}>
					</input>
					<span className={'checkbox_fake'}></span>
					<label>{props.label}</label>
				</label>
			</components.Option>
		</div>
	);
};

const MultiValueRemove = props => {
	return (
			<components.MultiValueRemove {...props}>
				<img src={deleteIcon} alt="Удалить" width='10px' height='10px'></img>
			</components.MultiValueRemove>
	);
};

const ClearIndicator = props => {
	return (
		<components.ClearIndicator {...props}>
			<img src={deleteIcon} alt="Удалить все" width='14px' height='14px'></img>
		</components.ClearIndicator>
	);
};

const DropdownIndicator = props => {

	const [ isIconDown, setDownIcon ] = useState(true);
	function changeDropdownIcon() {
		setDownIcon(!isIconDown)
	}

	return (
		<>
			{ isIconDown ? (
				<components.DropdownIndicator {...props}>
					<img src={downIcon} alt="Раскрыть" onClick={changeDropdownIcon}></img>
				</components.DropdownIndicator>
				) : (
				<components.DropdownIndicator {...props}>
					<img src={upIcon} alt="Скрыть" onClick={changeDropdownIcon}></img>
				</components.DropdownIndicator>
				)
			}
		</>
	);
};

const MultiValue = props => (
	<components.MultiValue {...props}>
		<span>{props.data.label}</span>
	</components.MultiValue>
);

const animatedComponents = makeAnimated();

export default function FilterInput(): ReactElement {

	const [ selectedOption, setSelectedOption ] = useState(null);
	function handleChange(selected) {
		setSelectedOption(selected)
	}
	return (
		<div className={'container'}>
			<span className={'filter-header'}>Номер ТК</span>
			<MySelect
				options={colourOptions}
				isMulti
				closeMenuOnSelect={false}
				hideSelectedOptions={false}
				components={{ Option, MultiValue, MultiValueRemove, DropdownIndicator, ClearIndicator, animatedComponents }}
				onChange={handleChange}
				value={selectedOption}
			/>
		</div>

	)


}
