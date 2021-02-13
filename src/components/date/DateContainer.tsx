import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import store from '../../store';

import Dropdown from '../dropdown/Dropdown';
import Date from './Date';
import { Open } from '../list/List';

type DateContainerProp = {
  toggleDropdown: any,
  open: Open
}

const DateContainer = observer(({toggleDropdown, open}: DateContainerProp) => {
    const dateDdOpen = open.dateDd

  return (
    <Dropdown label="Date range " open={dateDdOpen} toggleDropdown={toggleDropdown} name="dateDd">
        <Date name="dateDd" toggleDropdown={toggleDropdown}/>
    </Dropdown>
    )
});

export default DateContainer;