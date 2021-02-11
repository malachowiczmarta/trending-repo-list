import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ListItem from './ListItem';
import Date from '../date/Date';
import Language from '../language/Language'
import Button from '../button/Button';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';

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

    const onHandleBtnClick = () => {
        store.setSortOrder(sortOrder)
    };

    const sortList = (a, b) => {
        if(sortOrder === sortOption.ASCENDING) {
            return (a.stars > b.stars) ? 1 : -1;
        } else {
            return (a.stars < b.stars) ? 1 : -1;
        }
    }

    return (
        <section className="list-container">
            <div className="filter-list-container">
                <div className="filter-list-wrapper">
                    <Date handleDateChange={onHandleDateChange} radio={dateRange} />
                    <Language language={language} />
                    <button className="sort-btn" onClick={onHandleBtnClick}><p>sort</p>{sortOrder === sortOption.ASCENDING ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                </div>
            </div>

            {isError && <p>An error has occurred, try later</p>}
            {repoList.sort(sortList).map(repo => <ListItem key={`${repo.name}-${repo.id}`} data={repo} />)}
        </section>
    )
});

export default List;