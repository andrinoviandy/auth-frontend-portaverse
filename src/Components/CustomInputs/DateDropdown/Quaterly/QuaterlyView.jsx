/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import dayjs from "dayjs";
import { clsx } from "@mantine/core";
import { Icon } from "@iconify/react";
import CellCalendarMonth from "../CellCalendarMonth";
import { LIST_OF_SHORT_MONTH } from "../../../../Utils/Constants";

function QuaterlyView({ data, setData }) {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(null);

  const handleSelectQuaterly = (firstMonth, lastMonth, list) => {
    const first = dayjs(date).month(firstMonth);
    const last = dayjs(date).month(lastMonth);
    const from = dayjs(first).startOf("month");
    const to = dayjs(last).endOf("month");
    setData({
      ...data,
      dates: [from.$d, to.$d],
      label: `${from.$D} ${LIST_OF_SHORT_MONTH[from.$M]} - ${to.$D} ${
        LIST_OF_SHORT_MONTH[to.$M]
      } ${to.$y}
              `,
    });
    setSelected(list);
  };

  const handleNextYear = () => {
    setSelected(null);
    setDate(dayjs(date).add(1, "year"));
  };

  const handlePrevYear = () => {
    setDate(dayjs(date).add(-1, "year"));
    setSelected(null);
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
      <div className="mt-4">
        <div
          className={clsx(
            "hover:bg-bg2 grid grid-cols-3 w-[100%] rounded-md",
            { "border border-primary3 bg-bg2": selected === 0 },
          )}
          onClick={() => handleSelectQuaterly(0, 2, 0)}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <CellCalendarMonth
              className=" m-2"
              value={LIST_OF_SHORT_MONTH[index]}
            />
          ))}
        </div>

        <div
          onClick={() => handleSelectQuaterly(3, 5, 1)}
          className={clsx(
            "hover:bg-bg2 grid grid-cols-3 w-[100%] rounded-md",
            { "border border-primary3 bg-bg2": selected === 1 },
          )}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <CellCalendarMonth
              className=" m-2"
              value={LIST_OF_SHORT_MONTH[index + 3]}
            />
          ))}
        </div>
        <div
          className={clsx(
            "hover:bg-bg2 grid grid-cols-3 w-[100%] rounded-md",
            { "border border-primary3 bg-bg2": selected === 2 },
          )}
          onClick={() => handleSelectQuaterly(6, 8, 2)}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <CellCalendarMonth
              className=" m-2"
              value={LIST_OF_SHORT_MONTH[index + 6]}
            />
          ))}
        </div>
        <div
          className={clsx(
            "hover:bg-bg2 grid grid-cols-3 w-[100%] rounded-md",
            { "border border-primary3 bg-bg2": selected === 3 },
          )}
          onClick={() => handleSelectQuaterly(9, 11, 3)}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <CellCalendarMonth
              className=" m-2"
              value={LIST_OF_SHORT_MONTH[index + 9]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuaterlyView;
