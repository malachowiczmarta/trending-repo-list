import React from 'react';
import './List.css'

function ListItem({data}) {


    return (
    <article className="list-item-container" >
        <h2>{data.author}/{data.name}</h2>
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