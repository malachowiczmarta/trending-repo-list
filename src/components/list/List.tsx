import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ListItem from './ListItem';
import Date from '../date/Date';
import LangContainer from '../language/LangContainer'
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import Loader from "react-loader-spinner";

import { observer } from "mobx-react";
import store, { sortOption } from '../../store'
import Dropdown from '../dropdown/Dropdown';

export interface Repository {
    author: string,
    name: string,
    url: string,
    description: string,
    language: string,
    languageColor: string,
    stars: number,
    forks: number,
    currentPeriodStars: number
}

const List = observer(() => {

    const {dateRange, language, sortOrder}  = store;

    const [repoList, setRepoList] = useState<Repository[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    const getRepoList = async (language: string, radio: string) => {
        try {
            return Axios.get(`http://localhost:8000/repositories?language=${language}&since=${radio}`).then((response) => {
            const data = response.data
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

    const onHandleBtnClick = () => {
        store.setSortOrder(sortOrder)
    };

    const sortList = (a: Repository, b: Repository) => {
        if(sortOrder === sortOption.ASCENDING) {
            return (a.currentPeriodStars > b.currentPeriodStars) ? 1 : -1;
        } else {
            return (a.currentPeriodStars < b.currentPeriodStars) ? 1 : -1;
        }
    }

    const renderRepoList = () => {
        if (!repoList || !repoList.length) {
            return null;
        }
        return (
            repoList.sort(sortList).map((repo, index) => <ListItem key={`${repo.name}-${index}`} data={repo} />)
        );
    };

    return (
        <section className="list-container">
            {isError && <p>An error has occurred, try later</p>}
            <div className="filter-list-container">
                <div className="filter-list-wrapper">
                    <Dropdown label="Date range " langName={language} >
                        <Date/>
                    </Dropdown>
                    <LangContainer />
                    <button className="sort-btn" onClick={onHandleBtnClick}><p>sort</p>{sortOrder === sortOption.ASCENDING ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                </div>
            </div>

            {isLoading && <div className="loader-container"><Loader type="TailSpin" color="#00BFFF" height={80} width={80} /></div>}
            {renderRepoList()}
            {(!repoList.length && !isLoading) &&
                <h2 style={{margin: '30px auto', textAlign: 'center'}}>Sorry. We don't have any trending repositories for {language}.</h2>}
        </section>
    )
});

export default List;