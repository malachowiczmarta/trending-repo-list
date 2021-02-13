import React, { MouseEventHandler } from 'react';
import './Button.css'

type ButtonProps = {
  label: string,
  handleClick: MouseEventHandler<HTMLButtonElement>,
  value: string,
  variant: string,
  name?: string
}

function Button({label, handleClick, value, variant="", name}: ButtonProps) {

  return (
    <button onClick={handleClick} value={value} className={`btn-${variant}`} name={name}>{label}</button>
  );
};

export default Button;