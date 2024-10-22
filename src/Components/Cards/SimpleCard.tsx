import { color } from "@constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ActionIcon, Card, Group, Stack, Text } from "@mantine/core";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface SimpleCardProps {
  title: string;
  subTitle?: string;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  withRemoveButton?: boolean;
  className?: string;
  classNames?: {
    textWrapper?: string;
    title?: string;
    subTitle?: string;
  };
}

export default function SimpleCard({
  title,
  subTitle,
  onRemove,
  withRemoveButton = false,
  className = "",
  classNames = { textWrapper: "", title: "", subTitle: "" },
}: SimpleCardProps) {
  return (
    <Card
      withBorder
      className={twMerge("w-fit rounded-md", className)}
    >
      <Group align="center">
        <Stack gap={4}>
          <Text
            className={twMerge(
              "line-clamp-1 shrink-0 font-semibold text-sm",
              classNames?.title,
            )}
          >
            {title}
          </Text>
          {subTitle && (
            <Text
              className={twMerge(
                "line-clamp-1 shrink-0 text-darkGrey text-sm",
                classNames?.title,
              )}
            >
              {subTitle}
            </Text>
          )}
        </Stack>

        {withRemoveButton && (
          <ActionIcon
            size="sm"
            variant="transparent"
            color={color.darkGrey}
            onClick={onRemove}
          >
            <Icon icon="ic:round-close" width={24} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
}
