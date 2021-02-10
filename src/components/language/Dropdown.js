import React, { useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';
import { BiDownArrow } from 'react-icons/bi';
import { BiUpArrow } from 'react-icons/bi';
import Button from '../button/Button';

const Dropdown = observer(({data}) => {
    const [isOpen, setOpen] = useState(false);

    const toggleList = () => {
        setOpen(!isOpen)
    };

    const onHandleLangChange = (lang) => {
        if (lang === "all") {
            return store.setLanguage("")
        };
        store.setLanguage(lang);
    };

  return (
    <div className="dropdown-wrapper">
        <button type="button" className="dd-header" onClick={toggleList}>
            <div className="dropdown-header">
                <div className="dropdown-header-title">
                    <h2>language: {store.language ? store.language : "all"}</h2>
                    {isOpen ? <BiUpArrow /> : <BiDownArrow />}
                </div>
            </div>
        </button>
        {isOpen && (
            <div className="dropdown-list" onClick={(e) => onHandleLangChange(e.target.value)}>
                {data.map(lang => (
                        <Button key={lang.urlParam} value={lang.name} label={lang.name}/>
                ))}
            </div>
        )}
    </div>
  );
});

export default Dropdown;