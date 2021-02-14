import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';

import { BsCheck } from 'react-icons/bs';
import Button from '../button/Button';
import "./Lang.css"
import { LanguageElement } from './LangContainer';

type LangListProps = {
  data: LanguageElement[],
  toggleDropdown: any,
}

const LangList = observer(({data, toggleDropdown}: LangListProps) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setSearchTerm(event.target.value);
    };

    useEffect(() => {
       const results = data.map((item) => item.name).filter(name =>
         name.toLowerCase().includes(searchTerm)
       );
       setSearchResults(results);
     }, [searchTerm, data]);


    const onHandleLangClick = (lang: string) => {

        if (lang === "all") {
            store.setLanguage("");
        } else {
           store.setLanguage(lang);
        };
        toggleDropdown();
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
                        handleClick={(e) => {onHandleLangClick((e.target as any).value)}}
                />
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
                            handleClick={(e) => {onHandleLangClick((e.target as any).value)}}
                />
                </div>
        ))}
    </div>
  );
});

export default LangList;