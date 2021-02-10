import React from 'react';


function Button({label, handleClick, value}) {

  return (
    <button onClick={handleClick} value={value} >{label}</button>
  );
};

export default Button;