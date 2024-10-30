import {
  ComboboxData,
  ComboboxItem,
  ComboboxItemGroup,
  Group,
  MultiSelect as MantineMultiSelect,
  MultiSelectProps as MantineMultiSelectProps,
  Stack,
} from "@mantine/core";
import _ from "lodash";
import {
  ComponentType,
  createElement,
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  CustomComboboxData,
  CustomComboboxItem,
} from "./index.types";
import SimpleCard from "../Cards/SimpleCard";

interface MultiSelectProps
  extends Omit<MantineMultiSelectProps, "onChange"> {
  renderValueOutside?: boolean;
  data?: ComboboxData | CustomComboboxData;
  valueComponent?: ComponentType | string;
  valueComponentProps?: Record<string, unknown>;
  /** Called whe value changes */
  onChange?: (values: string[], valuesObjs: ComboboxData) => void;
}

export default function MultiSelect({
  data,
  value,
  onChange,
  valueComponent,
  valueComponentProps,
  renderValueOutside = false,
  ...rest
}: MultiSelectProps) {
  const [selectedValueObj, setSelectedValueObj] =
    useState<ComboboxData>([]);

  const mergedData = useMemo(() => {
    return _.uniqBy([...selectedValueObj, ...(data || [])], (d) => {
      if (typeof d === "string") {
        return d;
      }

      const customComboboxItem = d as CustomComboboxItem;
      if (customComboboxItem?.value) {
        return customComboboxItem?.value;
      }

      if ((d as ComboboxItemGroup<CustomComboboxItem>)?.group) {
        // TODO: Add handler for group ComboboxData
      }

      return null;
    });
  }, [selectedValueObj, data]);

  const handleChange = (newValue: string[]) => {
    const selectedObjs: CustomComboboxData = [];
    mergedData?.forEach((d) => {
      if (typeof d === "string") {
        selectedObjs.push(d);
      }

      const customComboboxItem = d as CustomComboboxItem;
      if (customComboboxItem?.value) {
        if (newValue.includes(customComboboxItem.value)) {
          selectedObjs.push(customComboboxItem);
        }
      }

      if ((d as ComboboxItemGroup<CustomComboboxItem>)?.group) {
        // TODO: Add handler for group ComboboxData
      }
    });
    setSelectedValueObj(selectedObjs);

    onChange?.(newValue, selectedObjs);
  };

  const getValueData = useCallback(
    (val: string) => {
      if (mergedData?.length) {
        const valueData = mergedData.find(
          (d) => d === val || (d as ComboboxItem)?.value === val,
        );
        return valueData;
      }
      return undefined;
    },
    [mergedData],
  );

  const removeValue = useCallback(
    (val: string) => {
      const newValues = value?.filter((v) => v !== val) || [];
      // const newValuesObjs = selectedValueObj?.filter((v) => {
      //   if (typeof v === "string") {
      //     return v !== val;
      //   }

      //   const customComboboxItem = v as CustomComboboxItem;
      //   if (customComboboxItem?.value) {
      //     return customComboboxItem.value !== val;
      //   }

      //   if ((v as ComboboxItemGroup<CustomComboboxItem>)?.group) {
      //     // TODO: Add handler for group ComboboxData
      //   }
      //   return false;
      // });
      const newValuesObjs = mergedData.filter((v) => {
        if (typeof v === "string") {
          return v !== val;
        }
        const customComboboxItem = v as CustomComboboxItem;
        if (customComboboxItem?.value) {
          return newValues.includes(customComboboxItem.value);
        }

        if ((v as ComboboxItemGroup<CustomComboboxItem>)?.group) {
          // TODO: Add handler for group ComboboxData
        }
        return false;
      });

      return { values: newValues, valuesObjs: newValuesObjs };
    },
    [value, mergedData],
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
          onRemove: () => {
            const { values, valuesObjs } = removeValue(val);
            onChange?.(values, valuesObjs);
          },
        };
      }
      return {};
    },
    [getValueData, valueComponentProps, onChange, removeValue],
  );

  return (
    <Stack gap="xs">
      <MantineMultiSelect
        data={mergedData as ComboboxData}
        value={value}
        onChange={handleChange}
        styles={{
          pill: { display: "none" },
        }}
        {...rest}
      />
      {renderValueOutside && !!value?.length && (
        <Group gap="xs" align="start">
          {value.map((v) =>
            valueComponent ? (
              createElement(valueComponent, {
                key: v,
                ...getValueComponentProps(v),
              })
            ) : (
              <SimpleCard
                title={
                  (getValueData(v) as CustomComboboxItem)?.label || v
                }
                withRemoveButton={
                  !(getValueData(v) as CustomComboboxItem)?.disabled
                }
                onRemove={() => {
                  const { values, valuesObjs } = removeValue(v);
                  onChange?.(values, valuesObjs);
                }}
              />
            ),
          )}
        </Group>
      )}
    </Stack>
  );
}
