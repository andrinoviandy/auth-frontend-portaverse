import { color } from "@constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, Group, MantineSize, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

import mantineSizeToPx from "../../Utils/Helpers/mantineSizeToPx";

interface MonthSliderProps {
  value?: Date;
  onChange?: (newValue: Date) => void;
  size?: MantineSize;
}
export default function MonthSlider({
  value = new Date(),
  onChange,
  size = "md",
}: MonthSliderProps) {
  const [tempVal, setTempVal] = useState(value);

  const formattedValue = useMemo(() => {
    return dayjs(tempVal).format("MMMM YYYY");
  }, [tempVal]);

  const handlePrev = () => {
    const newValue = dayjs(tempVal).subtract(1, "month").toDate();
    setTempVal(newValue);
    onChange?.(newValue);
  };

  const handleNext = () => {
    const newValue = dayjs(tempVal).add(1, "month").toDate();
    setTempVal(newValue);
    onChange?.(newValue);
  };

  return (
    <Group align="center" gap={2}>
      <ActionIcon
        variant="transparent"
        color={color.primary3}
        size={size}
        onClick={handlePrev}
      >
        <Icon
          icon="ic:round-chevron-left"
          width={mantineSizeToPx(size) + 8}
        />
      </ActionIcon>
      <Text size={size} className="font-medium">
        {formattedValue}
      </Text>
      <ActionIcon
        variant="transparent"
        color={color.primary3}
        size={size}
        onClick={handleNext}
      >
        <Icon
          icon="ic:round-chevron-right"
          width={mantineSizeToPx(size) + 8}
        />
      </ActionIcon>
    </Group>
  );
}
