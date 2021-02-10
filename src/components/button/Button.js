import React from 'react';
import './Button.css'

function Button({label, handleClick, value, variant}) {

  return (
    <button onClick={handleClick} value={value} className={`btn-${variant}`}>{label}</button>
  );
};

export default Button;