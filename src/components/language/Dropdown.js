import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';

import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { BsCheck } from 'react-icons/bs';
import Button from '../button/Button';
import "./Dropdown.css"

const Dropdown = observer(({data}) => {

    const [isOpen, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
       setSearchTerm(event.target.value);
    };

    useEffect(() => {
       const results = data.map((item) => item.name).filter(name =>
         name.toLowerCase().includes(searchTerm)
       );
       setSearchResults(results);
     }, [searchTerm, data]);

    const toggleList = () => {
        setOpen(!isOpen)
    };

    const onHandleLangChange = (lang) => {
        if (lang === "all") {
            store.setLanguage("");
        } else {
           store.setLanguage(lang);
        }
        setOpen(!isOpen)
    };

  return (
    <div className="dropdown-wrapper">
        <button className="dd-header" onClick={toggleList}>
            <div className="dropdown-header-title">
                <p>language:</p><b>{store.language ? store.language : "all"}</b>
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
        </button>

        {isOpen && (
            <div className="dropdown-list">
                <input className="search-input" type="text" placeholder="Search" value={searchTerm} onChange={handleChange}/>
                {searchResults ? searchResults.map((lang, index) => (
                    <div>
                        {store.language === lang ?
                        <span style={{visibility: "visible"}} ><BsCheck /></span> :
                        <span style={{visibility: "hidden"}} ><BsCheck /></span>}
                        <Button value={lang}
                                label={lang}
                                variant="lang"
                                handleClick={(e) => {onHandleLangChange(e.target.value)}}/>
                    </div>
                )) :
                    data.map(lang => (
                        <div>
                        {store.language === lang.name ?
                        <span style={{visibility: "visible"}} ><BsCheck /></span> :
                        <span style={{visibility: "hidden"}} ><BsCheck /></span>}
                        <Button value={lang.name}
                                    label={lang.name}
                                    variant="lang"
                                    handleClick={(e) => {onHandleLangChange(e.target.value)}}
                        />
                        </div>
                    ))
                }
            </div>
        )}
    </div>
  );
});

export default Dropdown;