import React, { MouseEventHandler } from "react";
import "./Button.css";

type ButtonProps = {
  label: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  value: string;
  variant: string;
};

function Button({ label, handleClick, value, variant = "" }: ButtonProps) {
  return (
    <button onClick={handleClick} value={value} className={`btn-${variant}`}>
      {label}
    </button>
  );
}

export default Button;
