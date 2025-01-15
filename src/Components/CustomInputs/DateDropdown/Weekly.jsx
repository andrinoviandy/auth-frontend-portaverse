/* eslint-disable react/prop-types */
import { Popover } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { LIST_OF_SHORT_MONTH } from "../../../Utils/Constants";

export default function Weekly({ data, setData }) {
  return (
    <Popover width={295} shadow="md" position="right">
      <Popover.Target>
        <div className="p-1 w-full flex justify-between">
          <div>Weekly</div>
          <div>
            <Icon
              fontSize={13}
              icon="material-symbols:arrow-forward-ios-rounded"
              style={{ marginTop: "3px" }}
            />
          </div>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div>
          <Calendar
            onChange={(date) => {
              const from = dayjs(date).day(1);
              const to = dayjs(date).day(7);
              setData({
                ...data,
                dates: [from.$d, to.$d],
                label: `${from.$D} ${
                  LIST_OF_SHORT_MONTH[from.$M]
                }  - ${to.$D} ${LIST_OF_SHORT_MONTH[to.$M]} ${to.$y}
              `,
              });
            }}
            style={(theme) => ({
              "[data-selected]": {
                background: `${theme.colors.bg[1]} !important`,
                color: `${theme.colors.dark[8]} !important`,
              },
              "[data-in-range]": {
                background: `${theme.colors.bg[1]} !important`,
                color: `${theme.colors.dark[8]} !important`,
              },
            })}
            value={data.dates}
          />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
