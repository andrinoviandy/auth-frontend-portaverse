/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { Icon } from "@iconify/react";
import {
  ActionIcon,
  Box,
  Divider,
  Popover,
  Text,
  TextInput,
  clsx,
} from "@mantine/core";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";
import { color } from "../../../Utils/Constants";
import getYearRangeNumber from "../../../Utils/Helpers/getYearRangeNumber";

export default function YearlyPicker({
  placeholder,
  value,
  onChange,
  rightSection,
  classNames = { root: "", inputRoot: "", input: "", label: "" },
  size,
  label,
  className,
  maxWidth,
  maxYear,
  error,
  inputWidth = "12rem",
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [yearContent, setYearContent] = useState(0);

  const years = getYearRangeNumber(1998);

  //   divide years for each row in popover
  const yearsInRow = 12;
  const rows = Math.ceil(years.length / yearsInRow);
  const yearsArray = Array.from({ length: rows }, (_, row) =>
    years.slice(row * yearsInRow, row * yearsInRow + yearsInRow),
  );

  return (
    <div
      style={{ maxWidth: maxWidth || 340 }}
      className={clsx(classNames.root)}
    >
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
            <TextInput
              key={value}
              style={{ width: inputWidth }}
              className={clsx(className)}
              classNames={{
                root: clsx(classNames.inputRoot),
                input: clsx("cursor-pointer", classNames.input),
                label: clsx(classNames.label),
              }}
              label={label}
              error={error}
              readOnly
              value={value}
              rightSection={
                rightSection || (
                  <Icon icon="akar-icons:chevron-down" width={12} />
                )
              }
              size={size}
              placeholder={placeholder}
            />
          </div>
        </Popover.Target>
        <Popover.Dropdown className="flex flex-col gap-4 w-fit p-8">
          <div
            className="flex justify-between items-center"
            onFocusCapture={() => setPopoverOpened(true)}
          >
            <ActionIcon
              onClick={() => {
                setYearContent(
                  yearsArray.length - 1 === yearContent
                    ? yearsArray.length - 1
                    : yearContent + 1,
                );
              }}
            >
              <Icon
                icon="ic:round-navigate-before"
                width={24}
                color={color.grey2}
              />
            </ActionIcon>
            <Text className="text-center text-base text-coffee font-medium">
              {
                yearsArray[yearContent][
                  yearsArray[yearContent].length - 1
                ]
              }
              - {yearsArray[yearContent][0]}
            </Text>
            <ActionIcon
              onClick={() => {
                setYearContent(
                  yearContent === 0 ? 0 : yearContent - 1,
                );
              }}
            >
              <Icon
                icon="ic:round-navigate-next"
                width={24}
                color={color.grey2}
              />
            </ActionIcon>
          </div>
          <Divider color={color.grey2} />
          <div className="grid grid-cols-4 gap-6 justify-center items-center">
            {yearsArray[yearContent].reverse().map((item, i) => {
              return (
                <Box
                  key={i}
                  sx={() => ({
                    padding: "1rem .5rem",
                    borderRadius: "0.5rem",
                    background: `${
                      value === item
                        ? color.primary3
                        : maxYear && item > maxYear
                        ? color.bg2
                        : ""
                    }`,
                    color: `${value === item ? "#FFF" : ""}`,
                  })}
                  role="button"
                  className={clsx(
                    " text-center w-fit",
                    maxYear && item > maxYear
                      ? "cursor-not-allowed"
                      : "cursor-pointer",
                  )}
                  onClick={() => {
                    if (maxYear && item > maxYear) return;
                    onChange(item);

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

YearlyPicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rightSection: PropTypes.element,
  classNames: PropTypes.shape({
    root: PropTypes.string,
    input: PropTypes.string,
    inputRoot: PropTypes.string,
  }),
  size: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  maxWidth: [PropTypes.string, PropTypes.number],
  maxYear: PropTypes.number,
  error: PropTypes.string,
  inputWidth: PropTypes.string,
};

YearlyPicker.defaultProps = {
  placeholder: "",
  // get this year from dayjs
  value: dayjs().format("YYYY"),
  onChange: () => {},
  rightSection: null,
  classNames: {
    root: "",
    input: "",
    inputRoot: "",
  },
  size: undefined,
  label: undefined,
  className: undefined,
  maxWidth: undefined,
  maxYear: undefined,
  error: undefined,
  inputWidth: undefined,
};
