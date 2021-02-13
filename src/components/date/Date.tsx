import React, { MouseEventHandler } from 'react';
import { observer } from "mobx-react";
import store from '../../store'
import "./Date.css"

type DateProps = {
  toggleDropdown: MouseEventHandler<HTMLButtonElement>
  name: string
};

const Date = observer(({toggleDropdown, name}: DateProps) => {

  const handleDateChange = (event: any) => {
    const targetValue = event.target.value
    // const targetName = event.target.name

    store.setDateRange(targetValue);
    toggleDropdown(event);
  };

  return (
    <div className="date-dd-wrapper">
      <form className="date-container">
        <label className="input-container" htmlFor="daily">daily
          <input name={name} type="radio" checked={store.dateRange === 'daily'} value="daily" onChange={(event) => handleDateChange(event)} />
        </label>
        <label className="input-container" htmlFor="weekly">weekly
          <input name={name} type="radio" checked={store.dateRange === 'weekly'} value="weekly" onChange={(event) => handleDateChange(event)} />
        </label>
        <label className="input-container" htmlFor="monthly">monthly
          <input name={name} type="radio" checked={store.dateRange === 'monthly'} value="monthly" onChange={(event) => handleDateChange(event)} />
        </label>
      </form>
    </div>

  );
});

export default Date;