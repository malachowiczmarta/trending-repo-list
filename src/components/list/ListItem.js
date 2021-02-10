import React from 'react';
import './List.css'

function ListItem({data}) {


    return (
    <article className="list-item-container" >
        <h2>{data.author}</h2>
        <a href={`${data.url}`} target="_blank" rel="noreferrer">{data.name}</a>
        <p>{data.description}</p>
        <ul className="list-item-list">
            <li>{data.language}</li>
            <li>{data.stars}</li>
            <li>{data.forks}</li>
        </ul>
    </article>
    )
};

export default ListItem;