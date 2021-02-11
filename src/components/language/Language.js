import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Dropdown from './Dropdown';


const Language = () => {
    const [languageList, setLanguageList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);


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
        <Dropdown data={languageList} />
      </>
    )
};

export default Language;