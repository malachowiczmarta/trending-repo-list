import React, { MouseEventHandler } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import "./Dropdown.css"

type DropdownProps = {
    children: any,
    label: string,
    langName?: string,
    open: boolean,
    name: string
    toggleDropdown: MouseEventHandler<HTMLButtonElement>
}

const Dropdown = ({children, label, langName, open, name, toggleDropdown}: DropdownProps) => {

  return (
    <div className="dropdown-wrapper">
        <button className="dd-header" name={name} onClick={(e: any) => toggleDropdown(e)}>
            <div className="dropdown-header-title">
                <p>{label}</p>{langName && <b>{langName}</b>}
                {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        </button>
        {open && children}
    </div>
  );
};

export default Dropdown;