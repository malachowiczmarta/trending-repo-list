import React, { useEffect, useState } from 'react';
import Axios from "axios";
import ListItem from './ListItem';


function List () {


    const [repoList, setRepoList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

  const getRepoList = async () => {
    try {
      return Axios.get(`http://localhost:8000/repositories?language=javascript&since=weekly`).then((response) => {
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

    return (
        <section className="list-container">
            {isError && <p>An error has occurred, try later</p>}
            {repoList.map((repo, index) => <ListItem key={`${index}-${repo.name}`} data={repo} />)}
        </section>
    )
};

export default List;