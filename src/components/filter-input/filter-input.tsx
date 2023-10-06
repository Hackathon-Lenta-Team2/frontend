import React, { ReactElement, useState } from 'react';
import '../checkbox/checkbox.scss';
import makeAnimated from 'react-select/animated';
import { components, default as ReactSelect } from 'react-select';
import searchIcon from '../../images/search-icon.svg';
import downIcon from '../../images/indicator-icon-down.svg';
import upIcon from '../../images/indicator-icon-up.svg';
import deleteIcon from '../../images/multi-val-delete-icon.svg';
import '../input.scss';

// тестовые данные просто для проверки отображения, потом добавлю реальные
const colourOptions = [
  { value: 'ocean1', label: 'OceanOceanOceanOceanOceanOcean' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

const colourStyles: any = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#F0FBFF',
    border: 0,
    borderRadius: 0,
    padding: '0 16px 0 8px',
    height: '56px',
    boxShadow: 'none',
    borderBottom: '1px solid #003C96',
  }),

  placeholder: (styles) => ({
    ...styles,
    color: '#003C96',
    fontSize: '20px',
  }),

  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: 0,
    width: '4px',
  }),

  menu: (styles) => ({
    ...styles,
    margin: 0,
    border: 0,
    backgroundColor: '#F0FBFF',
    boxShadow: 0,
  }),

  menuList: (styles) => ({
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
    ':active': {
      backgroundColor: 'transparent',
    },
  }),

  multiValue: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: 0,
    boxShadow: '0 0 10px #173C9126',
    maxWidth: '140px',
  }),

  multiValueRemove: (styles) => ({
    ...styles,
    borderRadius: 0,
    padding: '0 6px',
    ':hover': {
      backgroundColor: 'rgba(0, 60, 150, 0.2)',
    },
  }),

  input: (styles) => ({
    ...styles,
    fontSize: '20px',
  }),
};

function Placeholder(props) {
  const { selectProps } = props;
  const { menuIsOpen } = selectProps;
  return (
    <components.Placeholder {...props}>
      <div className='placeholder'>
        <img src={searchIcon} alt='Поиск' width='18px' height='18px' />
        {!menuIsOpen && <span>12321fsa-fgh345-daj3</span>}
      </div>
    </components.Placeholder>
  );
}

function MySelect(props) {
  return (
    <ReactSelect
      {...props}
      options={[...props.options]}
      onChange={(selected) => props.onChange(selected)}
      styles={colourStyles}
    />
  );
}

function Option(props) {
  return (
    <div>
      <components.Option {...props}>
        <div className='option-container'>
          <label className='checkbox-filter'>
            <input
              className='checkbox_real'
              type='checkbox'
              name='loginSave'
              checked={props.isSelected}
              onChange={() => null}
            />
            <span className='checkbox_fake' />
            <label>{props.label}</label>
          </label>
        </div>
      </components.Option>
    </div>
  );
}

function MultiValueRemove(props) {
  return (
    <components.MultiValueRemove {...props}>
      <img src={deleteIcon} alt='Удалить' width='10px' height='10px' className='icon' />
    </components.MultiValueRemove>
  );
}

function ClearIndicator(props) {
  return (
    <components.ClearIndicator {...props}>
      <img
        src={deleteIcon}
        alt='Удалить все'
        width='14px'
        height='14px'
        className='icon'
      />
    </components.ClearIndicator>
  );
}

function DropdownIndicator(props) {
  const { selectProps } = props;
  const { menuIsOpen } = selectProps;
  return (
    <>
      {menuIsOpen ? (
        <components.DropdownIndicator {...props}>
          <img src={upIcon} alt='Раскрыть' className='icon' />
        </components.DropdownIndicator>
      ) : (
        <components.DropdownIndicator {...props}>
          <img src={downIcon} alt='Скрыть' className='icon' />
        </components.DropdownIndicator>
      )}
    </>
  );
}

function MultiValue(props) {
  return (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );
}

const animatedComponents = makeAnimated();

export default function FilterInput({ children }): ReactElement {
  const [selectedOption, setSelectedOption] = useState(null);
  function handleChange(selected) {
    setSelectedOption(selected);
  }
  return (
    <div className='filter-container'>
      <span className='label'>{children}</span>
      <MySelect
        options={colourOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option,
          MultiValue,
          MultiValueRemove,
          DropdownIndicator,
          ClearIndicator,
          Placeholder,
          animatedComponents,
        }}
        onChange={handleChange}
        value={selectedOption}
      />
    </div>
  );
}
