import React, { useState } from 'react';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import "./Dropdown.css"

const Dropdown = ({children, label, langName}) => {

    const [isOpen, setOpen] = useState(false);
    const toggleList = () => {
        setOpen(!isOpen)
    };

  return (
    <div className="dropdown-wrapper">
        <button className="dd-header" onClick={toggleList}>
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