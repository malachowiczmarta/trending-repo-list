import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ListItem from './ListItem';
import Date from '../date/Date';
import Language from '../language/Language'


function List () {


    const [repoList, setRepoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [radio, setRadio] = useState('daily');
    const [language, setLanguage] = useState("");

    const getRepoList = async () => {
        try {
        return Axios.get(`http://localhost:8000/repositories?language=&since=daily`).then((response) => {
            setRepoList(response.data);
            setLoading(false);
        });
        } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
        }
    };

    useEffect(() => {
        getRepoList();
    }, []);

    const onHandleDateChange = (dateRange) => {
        setRadio(dateRange);
        console.log(dateRange)
    };

    const onHandleLangChange = (lang) => {
        setLanguage(lang)
        console.log(lang)
    };

    return (
        <div>
            <Date handleDateChange={onHandleDateChange} radio={radio} />
            <Language handleLangChange={onHandleLangChange} language={language} />
            <section className="list-container">
                {isError && <p>An error has occurred, try later</p>}
                {repoList.map((repo, index) => <ListItem key={`${index}-${repo.name}`} data={repo} />)}
            </section> 
        </div>

    )
};

export default List;