import React, { useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store'

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import "./Dropdown.css"

const Dropdown = observer(({children, label, langName}) => {

    // const [isOpen, setOpen] = useState(false);
    const toggleList = () => {
        store.setOpen()
    };

  return (
    <div className="dropdown-wrapper">
        <button className="dd-header" onClick={toggleList}>
            <div className="dropdown-header-title">
                <p>{label}</p>{langName && <b>{langName}</b>}
                {store.isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        </button>
        {store.isOpen && children}
    </div>
  );
});

export default Dropdown;