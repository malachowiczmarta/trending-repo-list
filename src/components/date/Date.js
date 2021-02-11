import React from 'react';
import "./Date.css"

const Date = ({handleDateChange, radio}) => {

  return (
    <div className="date-wrapper">
        <label>Date range:</label>
        <form>
            <input type="radio" checked={radio === 'daily'} value="daily" onChange={(event) => handleDateChange(event.target.value)} />
            <label htmlFor="daily">daily</label>
            <input type="radio" checked={radio === 'weekly'} value="weekly" onChange={(event) => handleDateChange(event.target.value)} />
            <label htmlFor="weekly">weekly</label>
            <input type="radio" checked={radio === 'monthly'} value="monthly" onChange={(event) => handleDateChange(event.target.value)} />
            <label htmlFor="monthly">monthly</label>
        </form>
    </div>


  );
};

export default Date;