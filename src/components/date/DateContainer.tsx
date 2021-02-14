import React, { useState } from "react";

import Dropdown from "../dropdown/Dropdown";
import Date from "./Date";

const DateContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDateDd = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dropdown label="Date range " open={isOpen} toggleDropdown={toggleDateDd}>
      <Date toggleDropdown={toggleDateDd} />
    </Dropdown>
  );
};

export default DateContainer;
