/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import { Popover } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useState } from "react";
import dayjs from "dayjs";
import Picker from "react-scrollable-picker";
import getYearRangeNumber from "../../../Utils/Helpers/getYearRangeNumber";
import { LIST_OF_SHORT_MONTH } from "../../../Utils/Constants/index";

export default function Yearly({ data, setData }) {
  const [dates, setDates] = useState({
    year: dayjs().$y,
  });

  const years = getYearRangeNumber(1990, 10);

  const optionGroups = {
    year: years.map((i) => ({ value: i, label: i })),
  };

  const changeData = (year) => {
    const dayOnYear = dayjs().year(year);
    const from = dayjs(dayOnYear).startOf("year");
    const to = dayjs(dayOnYear).endOf("year");
    setData({
      ...data,
      dates: [from.$d, to.$d],
      label: `${from.$D} ${LIST_OF_SHORT_MONTH[from.$M]}  - ${
        to.$D
      } ${LIST_OF_SHORT_MONTH[to.$M]} ${to.$y}
              `,
    });
  };

  const handleChange = (name, value) => {
    setDates({
      ...dates,
      [name]: value,
    });
    changeData(value);
  };

  const handleClickArrow = (type = "next") => {
    let operasi = +1;
    if (type === "down") {
      operasi = -1;
    }

    setDates({
      ...dates,
      year: dates.year + operasi,
    });

    changeData(dates.year + operasi);
  };

  return (
    <div>
      <Popover width={150} shadow="md" position="right">
        <div onClick={() => changeData(dates.year)}>
          <Popover.Target>
            <div className="p-1 w-full flex justify-between">
              <div>Yearly</div>
              <div>
                <Icon
                  fontSize={13}
                  icon="material-symbols:arrow-forward-ios-rounded"
                  style={{ marginTop: "3px" }}
                />
              </div>
            </div>
          </Popover.Target>
        </div>
        <Popover.Dropdown>
          <div className="flex justify-center">
            <div
              className="p-2 hover:bg-bg2"
              onClick={() => handleClickArrow("next")}
            >
              <Icon
                icon="material-symbols:keyboard-arrow-up-rounded"
                fontSize={20}
                style={{ color: "#C1C7CD" }}
              />
            </div>
          </div>
          <Picker
            optionGroups={optionGroups}
            valueGroups={dates}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <div
              className="p-2 hover:bg-bg2"
              onClick={() => handleClickArrow("down")}
            >
              <Icon
                icon="material-symbols:keyboard-arrow-down-rounded"
                fontSize={20}
                style={{ color: "#C1C7CD" }}
              />
            </div>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
