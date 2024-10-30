import { ComboboxItem } from '@mantine/core';

export interface CustomComboboxItem extends ComboboxItem {
  [key: string]: unknown;
}

export type CustomComboboxData = Array<string | CustomComboboxItem>;
