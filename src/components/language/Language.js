import React, { useEffect, useState } from 'react';
import Axios from "axios";


const Language = ({language, handleLangChange}) => {


    const [languageList, setLanguageList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    const getLanguageList = async () => {
        try {
        return Axios.get(`http://localhost:8000/languages`).then((response) => {
            const languages = response.data;
            const allLang = [{urlParam: "all-lang", name: "all"}];
            const data = allLang.concat(languages);
            console.log(data)
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
    <form>
        <label>
        Languages:
        <select value={language} onChange={(event) => handleLangChange(event.target.value)}>
            {languageList.map(lang => (
                <option key={lang.urlParam} value={lang.name}>{lang.name}</option>
            ))}
        </select>
        </label>
    </form>
  );
};

export default Language;