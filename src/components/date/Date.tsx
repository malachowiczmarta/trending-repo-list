import { observer } from "mobx-react";
import store, { dateRangeOption } from '../../store'
import "./Date.css"

type DateProps = {
  toggleDropdown: any
};

const Date = observer(({toggleDropdown}: DateProps) => {

  const handleDateChange = (event: any) => {
    const targetValue = event.target.value
    store.setDateRange(targetValue);
    toggleDropdown();
  };

  return (
    <div className="date-dd-wrapper">
      <form className="date-container">
        <label className="input-container" htmlFor="daily">daily
          <input type="radio" checked={store.dateRange === dateRangeOption.DAILY} value="daily" onChange={(event) => handleDateChange(event)} />
        </label>
        <label className="input-container" htmlFor="weekly">weekly
          <input type="radio" checked={store.dateRange === dateRangeOption.WEEKLY} value="weekly" onChange={(event) => handleDateChange(event)} />
        </label>
        <label className="input-container" htmlFor="monthly">monthly
          <input type="radio" checked={store.dateRange === dateRangeOption.MONTHLY} value="monthly" onChange={(event) => handleDateChange(event)} />
        </label>
      </form>
    </div>

  );
});

export default Date;