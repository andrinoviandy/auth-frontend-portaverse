import { MantineSize } from "@mantine/core";

/**
 * A utility function to convert Mantine's size unit into pixel unit
 */

export default function mantineSizeToPx(size: MantineSize): number {
  const convertMap = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };
  return convertMap[size];
}
