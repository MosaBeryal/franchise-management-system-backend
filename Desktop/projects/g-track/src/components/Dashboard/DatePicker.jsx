import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <Datepicker
      primaryColor="yellow"
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
      // asSingle={true}
      inputClassName={"w-full p-2 shadow-md"}
      useRange={true}
    />
  );
};
export default DatePicker;
