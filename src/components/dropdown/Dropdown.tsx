import React, { MouseEventHandler } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import "./Dropdown.css"

type DropdownProps = {
    children: any,
    label: string,
    langName?: string,
    open: boolean,
    toggleDropdown: MouseEventHandler<HTMLButtonElement>
};

const Dropdown = ({children, label, langName, open, toggleDropdown}: DropdownProps) => {

  return (
    <div className="dropdown-wrapper">
        <button onClick={toggleDropdown}>
            <div className="dropdown-header-title">
                <p>{label}</p>{langName && <p>{langName}</p>}
                {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        </button>
        {open && children}
    </div>
  );
};

export default Dropdown;