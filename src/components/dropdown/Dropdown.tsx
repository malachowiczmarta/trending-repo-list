import React, { MouseEventHandler } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import "./Dropdown.css"

type DropdownProps = {
    children: any,
    label: string,
    langName: string,
    isOpen: boolean,
    toggleDropdown: MouseEventHandler<HTMLButtonElement>
}

const Dropdown = ({children, label, langName, isOpen, toggleDropdown}: DropdownProps) => {

  return (
    <div className="dropdown-wrapper">
        <button className="dd-header" onClick={toggleDropdown}>
            <div className="dropdown-header-title">
                <p>{label}</p>{langName && <b>{langName}</b>}
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        </button>
        {isOpen && children}
    </div>
  );
};

export default Dropdown;