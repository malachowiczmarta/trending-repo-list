import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { observer } from "mobx-react";
import store from '../../store';

import Dropdown from '../dropdown/Dropdown';
import LangList from './LangList';
import { Open } from '../list/List';

export type LanguageElement = {
    urlParam: string,
    name: string
};

// type LangContainerProp = {
//     toggleDropdown: any,
//     open: Open
// };

const LangContainer = observer(() => {
    const [languageList, setLanguageList] = useState<Array<LanguageElement>>([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleLangDd = () => {
      setIsOpen(!isOpen)
    }
  

    const getLanguageList = async () => {
        try {
        return Axios.get(`http://localhost:8000/languages`).then((response) => {
            const languages = response.data;
            const allLang = [{urlParam: "all-lang", name: "all"}];
            const data = allLang.concat(languages);
            setLanguageList(data);
            setLoading(false);
        });
        } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
        }
    };

    useEffect(() => {
        getLanguageList();
    }, []);


  return (
      <>
        {isError && <p>An error has occurred, try later</p>}
        <Dropdown label="language: " langName={store.language ? store.language : "all"} open={isOpen} toggleDropdown={toggleLangDd}>
            <LangList data={languageList} toggleDropdown={toggleLangDd}/>
        </Dropdown>
      </>
    )
});

export default LangContainer;