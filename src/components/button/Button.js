import React from 'react';


function Button({label, handleClick}) {

  return (
    <button onClick={handleClick}>{label}</button>
  );
};

export default Button;