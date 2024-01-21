/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { clsx } from "@mantine/core";
import React from "react";

function CellCalendarMonth({ value, onClick, className }) {
  return (
    <div
      className={clsx(className, "text-center py-4 rounded-md ")}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

export default CellCalendarMonth;
