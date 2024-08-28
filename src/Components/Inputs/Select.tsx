import {
  ComboboxData,
  ComboboxItem,
  Select as MantineSelect,
  SelectProps as MantineSelectProps,
  Stack,
} from "@mantine/core";
import { ComponentType, createElement, useCallback } from "react";

import {
  CustomComboboxData,
  CustomComboboxItem,
} from "./index.types";
import SimpleCard from "../Cards/SimpleCard";

interface SelectProps extends MantineSelectProps {
  renderValueOutside?: boolean;
  data?: ComboboxData | CustomComboboxData;
  valueComponent?: ComponentType | string;
  valueComponentProps?: Record<string, unknown>;
}

export default function Select({
  data,
  value,
  onChange,
  valueComponent,
  valueComponentProps,
  renderValueOutside = false,
  ...rest
}: SelectProps) {
  const getValueData = useCallback(
    (val: string) => {
      if (data?.length) {
        const valueData = data?.find(
          (d) => d === val || (d as ComboboxItem)?.value === val,
        );

        return typeof valueData === "string"
          ? { label: valueData, value: valueData }
          : valueData;
      }
      return undefined;
    },
    [data],
  );

  const getValueComponentProps = useCallback(
    (val: string) => {
      const valueData = getValueData(val);

      if (valueData) {
        const selected =
          typeof valueData === "string"
            ? { value: valueData, label: valueData }
            : valueData;

        return {
          ...selected,
          ...valueComponentProps,
          onRemove: () => onChange?.(null, { label: "", value: "" }),
        };
      }
      return {};
    },
    [getValueData, valueComponentProps, onChange],
  );

  return (
    <Stack gap="xs">
      <MantineSelect
        data={data as ComboboxData}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {renderValueOutside &&
        value &&
        (valueComponent ? (
          createElement(valueComponent, getValueComponentProps(value))
        ) : (
          <SimpleCard
            title={(getValueData(value) as CustomComboboxItem)?.label}
            withRemoveButton
            onRemove={() =>
              onChange?.(null, { label: "", value: "" })
            }
          />
        ))}
    </Stack>
  );
}
