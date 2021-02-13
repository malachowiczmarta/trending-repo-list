import React, { MouseEventHandler } from 'react';
import { observer } from "mobx-react";
import store from '../../store'
import "./Date.css"

type DateProps = {
  toggleDropdown: MouseEventHandler<HTMLButtonElement>
}


const Date = observer(({toggleDropdown}: DateProps) => {

  const handleDateChange = (range: string) => {
    store.setDateRange(range);
    toggleDropdown();
  };

  return (
    <div className="date-dd-wrapper">
      <form className="date-container">
        <label className="input-container" htmlFor="daily">daily
          <input type="radio" checked={store.dateRange === 'daily'} value="daily" onChange={(event) => handleDateChange(event.target.value)} />
        </label>
        <label className="input-container" htmlFor="weekly">weekly
          <input type="radio" checked={store.dateRange === 'weekly'} value="weekly" onChange={(event) => handleDateChange(event.target.value)} />
        </label>
        <label className="input-container" htmlFor="monthly">monthly
          <input type="radio" checked={store.dateRange === 'monthly'} value="monthly" onChange={(event) => handleDateChange(event.target.value)} />
        </label>
      </form>
    </div>

  );
});

export default Date;