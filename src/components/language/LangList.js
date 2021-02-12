import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';

import { BsCheck } from 'react-icons/bs';
import Button from '../button/Button';
import "./Lang.css"

const LangList = observer(({data}) => {

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


    const onHandleLangChange = (lang) => {
        if (lang === "all") {
            store.setLanguage("");
        } else {
           store.setLanguage(lang);
        };
        store.setOpen();
    };

  return (
    <div className="dropdown-list">
        <input className="search-input" type="text" placeholder="Search" value={searchTerm} onChange={handleChange}/>
        {searchResults ? searchResults.map((lang, index) => (
            <div key={`search-${index}`}>
                {store.language === lang ?
                <span style={{visibility: "visible"}} ><BsCheck /></span> :
                <span style={{visibility: "hidden"}} ><BsCheck /></span>}
                <Button value={lang}
                        label={lang}
                        variant="lang"
                        handleClick={(e) => {onHandleLangChange(e.target.value)}}/>
            </div>
        )) :
            data.map((lang, index) => (
                <div key={`lang-item-${index}`}>
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
  );
});

export default LangList;