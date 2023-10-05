import React, { ReactElement } from 'react';
import './button.scss';

// два стиля кнопки (пропс style) - белая это 'secondary', синяя дефолтная, можно не передавать его в пропсы
// type - тип кнопки (button, submit, etc)
export default function Button({
  style,
  type,
  children,
  disabled,
}): ReactElement {
  let className = 'button ';
  if (style === 'secondary') {
    className += 'button_secondary';
  }

  if (disabled === true) {
    className += 'button_disabled';
  }

  return (
    <button type={type} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
