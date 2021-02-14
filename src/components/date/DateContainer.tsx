import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';

import Dropdown from '../dropdown/Dropdown';
import Date from './Date';
import { Open } from '../list/List';

// type DateContainerProp = {
//   toggleDropdown: any,
//   open: Open
// }

const DateContainer = observer(() => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDateDd = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Dropdown label="Date range " open={isOpen} toggleDropdown={toggleDateDd}>
        <Date toggleDropdown={toggleDateDd}/>
    </Dropdown>
    )
});

export default DateContainer;