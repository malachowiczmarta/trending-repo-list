import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ListItem from './ListItem';
import Date from '../date/Date';
import Language from '../language/Language'
import Button from '../button/Button';

import { observer } from "mobx-react";
import store, { sortOption } from '../../store'


const List = observer(() => {

    const {dateRange, language, sortOrder}  = store;

    const [repoList, setRepoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    const getRepoList = async (language, radio) => {
        try {
            return Axios.get(`http://localhost:8000/repositories?language=${language}&since=${radio}`).then((response) => {
            const data = response.data.map((item, index) => {
                item.id = index;
                return item;
            });
            setRepoList(data);
            setLoading(false);
        });
        } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
        }
    };

    useEffect(() => {
        getRepoList(language, dateRange);
    }, [language, dateRange]);

    const onHandleDateChange = (dateRange) => {
        store.setDateRange(dateRange);
    };

    const onHandleLangChange = (lang) => {
        if (lang === "all") {
            return store.setLanguage("")
        };
        store.setLanguage(lang);
    };



    const onHandleBtnClick = () => {
        store.setSortOrder(sortOrder)
    };

    const sortList = (a, b) => {
        if(sortOrder === sortOption.ASCENDING) {
            return (a.stars > b.stars) ? 1 : -1;
        } else if (sortOrder === sortOption.DESCENDING) {
            return (a.stars < b.stars) ? 1 : -1;
        } else {
            return (a.id > b.id) ? 1 : -1;
        }
    }

    return (
        <div>
            <Date handleDateChange={onHandleDateChange} radio={dateRange} />
            <Button label="sort" handleClick={onHandleBtnClick} />
            <Language handleLangChange={onHandleLangChange} language={language} />
            <section className="list-container">
                {isError && <p>An error has occurred, try later</p>}
                {repoList.sort(sortList).map(repo => <ListItem key={`${repo.name}-${repo.id}`} data={repo} />)}
            </section>
        </div>

    )
});

export default List;