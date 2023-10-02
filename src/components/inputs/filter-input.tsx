import React, {ChangeEvent, FormEvent, ReactElement, useEffect, useState, Component}  from 'react';
import '../checkbox/checkbox.scss';
import ReactDOM from "react-dom";
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

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

const MySelect = props => {
		return (
			<ReactSelect
				{...props}
				options={[...props.options]}
				onChange={selected => {
					if (
						selected !== null &&
						selected.length > 0
					) {
						return props.onChange(props.options);
					}
					return props.onChange(selected);
				}}
			/>
		);
};

const Option = props => {
	return (
		<div>
			<components.Option {...props}>
				<label className={'checkbox'}>{props.label}
					<input className={'checkbox_real'}
								 type="checkbox"
								 checked={props.isSelected}
								 onChange={() => null}
					>{" "}</input>
					<span className={'checkbox_fake'}></span>
				</label>
			</components.Option>
		</div>
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
		<MySelect
			options={colourOptions}
			isMulti
			closeMenuOnSelect={false}
			hideSelectedOptions={false}
			components={{ Option, MultiValue, animatedComponents }}
			onChange={handleChange}
			value={selectedOption}
		/>
	)
}
