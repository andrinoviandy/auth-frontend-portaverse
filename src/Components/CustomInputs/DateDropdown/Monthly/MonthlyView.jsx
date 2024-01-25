/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import dayjs from "dayjs";
import { clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import CellCalendarMonth from "../CellCalendarMonth";
import { LIST_OF_SHORT_MONTH } from "../../../../Utils/Constants";

function MonthlyView({ data, setData }) {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(null);

  const handleSelectMonth = (month) => {
    const dayOfMonth = dayjs(date).month(month);
    const from = dayjs(dayOfMonth).startOf("month");
    const to = dayjs(dayOfMonth).endOf("month");
    setSelected(month);
    setData({
      ...data,
      dates: [from.$d, to.$d],
      label: `${from.$D} ${LIST_OF_SHORT_MONTH[from.$M]} - ${to.$D} ${
        LIST_OF_SHORT_MONTH[to.$M]
      } ${to.$y}
              `,
    });
  };

  const handleNextYear = () => {
    setDate(dayjs(date).add(1, "year"));
  };

  const handlePrevYear = () => {
    setDate(dayjs(date).add(-1, "year"));
  };
  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div onClick={handlePrevYear} className="hover:bg-bg2 p-3">
          <Icon
            fontSize={13}
            icon="material-symbols:arrow-back-ios-rounded"
            style={{ color: "#C1C7CD" }}
          />
        </div>
        <div className="pt-2">{dayjs(date).year()}</div>
        <div onClick={handleNextYear} className="hover:bg-bg2 p-3">
          <Icon
            fontSize={13}
            icon="material-symbols:arrow-forward-ios-rounded"
            style={{ color: "#C1C7CD" }}
          />
        </div>{" "}
      </div>

      <div className="grid grid-cols-3 w-[100%] mt-4">
        {LIST_OF_SHORT_MONTH.map((month, index) => (
          <CellCalendarMonth
            className={clsx("hover:bg-bg2  m-2", {
              "border-primary3 border bg-bg2": index === selected,
            })}
            key={month}
            value={month}
            onClick={() => handleSelectMonth(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default MonthlyView;
