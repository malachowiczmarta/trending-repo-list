import React from "react";
import { observer } from "mobx-react";
import store from "../../store";

import "./RepoList.css";
import { BsStar } from "react-icons/bs";
import { VscRepoForked } from "react-icons/vsc";
import { Repository } from "./RepoList";

type ListItemProps = {
  data: Repository;
};

const RepoListItem = observer(({ data }: ListItemProps) => {
  const { languageColor = "#DDDDDD" } = data;

  return (
    <article className="list-item-container">
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "-3px",
          backgroundColor: languageColor,
          width: "6px",
          height: "100%",
        }}
      />
      <div className="list-item-header">
        <h2>{data.author}/</h2>
        <a href={`${data.url}`} target="_blank" rel="noreferrer">
          {data.name}
        </a>
      </div>
      <p>{data.description}</p>
      <ul className="list-item-list">
        {data.language && <li>{data.language}</li>}
        <li>
          <BsStar /> {data.stars} total
        </li>
        <li>
          <VscRepoForked /> {data.forks}
        </li>
        <li>
          <BsStar /> {data.currentPeriodStars} {store.dateRange}
        </li>
      </ul>
    </article>
  );
});

export default RepoListItem;
