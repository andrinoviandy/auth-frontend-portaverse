import { Icon } from "@iconify/react";
import { ActionIcon, Box, Input, Popover, Text } from "@mantine/core";
import React, { useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { LIST_OF_MONTH_INDONESIA_2 } from "../../../Utils/Constants";

export default function MonthlyPicker({ setValueMonth }) {
  const [valueYear, setValueYear] = useState(dayjs().year());
  const [value, setValue] = useState({
    month: dayjs().month(),
  });
  const [popoverOpened, setPopoverOpened] = useState(false);

  return (
    <div style={{ maxWidth: 340, margin: "auto" }}>
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
      >
        <Popover.Target>
          <div
            onFocusCapture={() => setPopoverOpened(true)}
            onBlurCapture={() => setPopoverOpened(false)}
          >
            <Input
              placeholder="Pilih Bulan"
              className="w-[12rem]"
              value={`${value.month} - ${valueYear}`}
              rightSection={
                <Icon
                  fontSize={14}
                  icon="material-symbols:arrow-drop-down"
                />
              }
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown className="w-[300px] flex flex-col gap-4 m-4">
          <div
            className="flex justify-between items-center"
            onFocusCapture={() => setPopoverOpened(true)}
          >
            <ActionIcon
              onClick={() => {
                setValueYear(valueYear - 1);
              }}
            >
              <Icon icon="akar-icons:arrow-left" />
            </ActionIcon>
            <Text className="text-center">{valueYear}</Text>
            <ActionIcon
              onClick={() => {
                setValueYear(valueYear + 1);
              }}
            >
              <Icon icon="akar-icons:arrow-right" />
            </ActionIcon>
          </div>
          <div className="grid grid-cols-3 gap-4 justify-center items-center">
            {LIST_OF_MONTH_INDONESIA_2.reverse().map((item, i) => {
              return (
                <Box
                  key={i}
                  sx={(theme) => ({
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    background: `${
                      value.month === item ? theme.colors.blue[0] : ""
                    }`,
                    color: `${
                      value.month === item ? theme.colors.blue[9] : ""
                    }`,
                  })}
                  role="button"
                  className="cursor-pointer text-center"
                  onClick={() => {
                    // join value month and year and convert to date
                    const date = dayjs()
                      .year(valueYear)
                      .month(i)
                      .toDate();

                    // set value
                    setValue({
                      month: item,
                      year: valueYear,
                    });

                    // set value to parent
                    setValueMonth(date);
                    setPopoverOpened(false);
                  }}
                >
                  <Text className="text-sm">{item}</Text>
                </Box>
              );
            })}
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

MonthlyPicker.propTypes = {
  setValueMonth: PropTypes.func,
};

MonthlyPicker.defaultProps = {
  setValueMonth: () => {},
};
