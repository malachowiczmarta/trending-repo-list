import React, { useEffect, useState, MouseEventHandler } from 'react';
import { observer } from "mobx-react";
import store from '../../store';

import { BsCheck } from 'react-icons/bs';
import Button from '../button/Button';
import "./Lang.css"
import { LanguageElement } from './LangContainer';

type LangListProps = {
  data: LanguageElement[],
  toggleDropdown: MouseEventHandler<HTMLButtonElement>,
  name: string
}

const LangList = observer(({data, toggleDropdown, name}: LangListProps) => {

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


    const onHandleLangClick = (event: any) => {
      const targetValue = event.target.value
      // const targetName = event.target.name

        if (targetValue === "all") {
            store.setLanguage("");
        } else {
           store.setLanguage(targetValue);
        };
        toggleDropdown(event);
        console.log(event)
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
                        handleClick={(e) => {onHandleLangClick((e.target as any).value)}}/>
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
                            name={name}
                            handleClick={(e) => {onHandleLangClick(e)}}
                />
                </div>
            ))
        }
    </div>
  );
});

export default LangList;