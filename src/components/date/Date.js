import React from 'react';


const Date = ({handleDateChange, radio}) => {

  return (
    <form>
        <input type="radio" checked={radio === 'daily'} value="daily" onChange={(event) => handleDateChange(event.target.value)} />
        <label htmlFor="daily">daily</label>
        <input type="radio" checked={radio === 'weekly'} value="weekly" onChange={(event) => handleDateChange(event.target.value)} />
        <label htmlFor="weekly">weekly</label>
        <input type="radio" checked={radio === 'monthly'} value="monthly" onChange={(event) => handleDateChange(event.target.value)} />
        <label htmlFor="monthly">monthly</label>
    </form>
  );
};

export default Date;