import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ListItem from './ListItem';
import Date from '../date/Date';
import Language from '../language/Language'
import Button from '../button/Button';


function List () {


    const [repoList, setRepoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [radio, setRadio] = useState('daily');
    const [language, setLanguage] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const ascendingSort = "ascending";
    const descendingSort = "descending";
    const defaultSort = "";

    const getRepoList = async (language, radio) => {
        try {
        return Axios.get(`http://localhost:8000/repositories?language=${language}&since=${radio}`).then((response) => {
            setRepoList(response.data.map((item, index) => {
                item.id = index;
                return item;
            }));
            setLoading(false);
        });
        } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
        }
    };

    useEffect(() => {
        getRepoList(language, radio);
    }, [language, radio]);

    const onHandleDateChange = (dateRange) => {
        setRadio(dateRange);
    };

    const onHandleLangChange = (lang) => {
        setLanguage(lang)
    };



    const onHandleBtnClick = () => {
        if(sortOrder === defaultSort) {
            console.log("Set to Ascending");
            setSortOrder(ascendingSort);
        } else if (sortOrder === ascendingSort) {
            console.log("Set to Descending");
            setSortOrder(descendingSort)
        } else {
            console.log("Set to Default");
            setSortOrder(defaultSort);
        }
    };

    const sortList = (a, b) => {
        if(sortOrder === ascendingSort) {
            return (a.stars > b.stars) ? 1 : -1;
        } else if (sortOrder === descendingSort) {
            return (a.stars < b.stars) ? 1 : -1;
        } else {
            return (a.id > b.id) ? 1 : -1;
        }
    }

    return (
        <div>
            <Date handleDateChange={onHandleDateChange} radio={radio} />
            <Button label="sort" handleClick={onHandleBtnClick} />
            <Language handleLangChange={onHandleLangChange} language={language} />
            <section className="list-container">
                {isError && <p>An error has occurred, try later</p>}
                {repoList.sort(sortList).map(repo => <ListItem key={`${repo.name}-${repo.id}`} data={repo} />)}
            </section>
        </div>

    )
};

export default List;