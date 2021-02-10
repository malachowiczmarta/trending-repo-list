import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';
import { BiDownArrow } from 'react-icons/bi';
import { BiUpArrow } from 'react-icons/bi';
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
        // setOpen(!isOpen)
    };

  return (
    <div className="dropdown-wrapper">
        <button className="dd-header" onClick={toggleList}>
            <div className="dropdown-header-title">
                <h2>language: {store.language ? store.language : "all"}</h2>
                {isOpen ? <BiUpArrow /> : <BiDownArrow />}
            </div>
        </button>

        {isOpen && (
            <div className="dropdown-list" onClick={(e) => onHandleLangChange(e.target.value)}>
                <input className="search-input" type="text" placeholder="Search" value={searchTerm} onChange={handleChange}/>
                {searchResults ? searchResults.map((lang, index) => (
                    <div>
                        {store.language === lang ?
                        <span style={{visibility: "visible"}} ><BsCheck /></span> :
                        <span style={{visibility: "hidden"}} ><BsCheck /></span>}
                        <Button key={`search-${index}`} value={lang} label={lang} variant="lang" />
                    </div>
                )) :
                    <div>
                        {data.map(lang => (
                            <div>
                            {store.language === lang.name ?
                            <span style={{visibility: "visible"}} ><BsCheck /></span> :
                            <span style={{visibility: "hidden"}} ><BsCheck /></span>}
                            <Button key={lang.urlParam} value={lang.name} label={lang.name} variant="lang"/>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )}
    </div>
  );
});

export default Dropdown;