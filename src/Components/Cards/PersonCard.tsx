import { color } from "@constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  ActionIcon,
  Anchor,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { MouseEventHandler, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import ProfilePicture from "../ProfilePicture";

export interface Person {
  imageUrl?: string | null;
  name: string;
  positionName?: string;
  groupName?: string;
  email?: string;
  other?: ReactNode | string;
  badgeIcon?: ReactNode | null;
}

export interface PersonCardClassNamesProps {
  wrapper?: string;
  textWrapper?: string;
  profilePicture?: string;
  profilePictureSize?: number;
}

interface PersonCardProps extends Person {
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  withRemoveButton?: boolean;
  className?: string;
  classNames?: PersonCardClassNamesProps;
  handleClick?: () => void;
}

export default function PersonCard({
  imageUrl,
  name,
  positionName,
  groupName,
  email,
  other,
  badgeIcon,
  onRemove,
  loading,
  withRemoveButton = false,
  className = "",
  classNames = {
    wrapper: "",
    textWrapper: "",
    profilePicture: "",
    profilePictureSize: 48,
  },
  handleClick = () => {},
}: PersonCardProps) {
  return (
    <Card
      withBorder
      className={twMerge("w-fit rounded-md", className)}
      onClick={handleClick}
    >
      <Group
        align="start"
        wrap="nowrap"
        className={classNames?.wrapper}
      >
        {loading ? (
          <Skeleton
            w={48}
            h={48}
            radius="100%"
            className="shrink-0"
          />
        ) : (
          <ProfilePicture
            alt="avatar"
            imageUrl={imageUrl}
            name={name}
            withBadge={!!badgeIcon}
            badgeIcon={badgeIcon}
            size={classNames.profilePictureSize || 48}
            className={classNames.profilePicture}
          />
        )}

        <Stack gap={4} className={classNames?.textWrapper}>
          {loading ? (
            <>
              <Skeleton w={80} h={14} my={3} />
              <Skeleton w={100} h={14} my={3} />
              <Skeleton w={70} h={14} my={3} />
              <Skeleton w={100} h={14} my={3} />
            </>
          ) : (
            <>
              <Tooltip label={name} disabled={!name}>
                <Text className="line-clamp-1 w-fit shrink-0 text-sm font-semibold">
                  {name}
                </Text>
              </Tooltip>

              {positionName && (
                <Tooltip label={positionName}>
                  <Text className="line-clamp-1 w-fit shrink-0 break-all text-sm text-darkGrey">
                    {positionName}
                  </Text>
                </Tooltip>
              )}
              {groupName && (
                <Tooltip label={groupName}>
                  <Text className="line-clamp-1 w-fit shrink-0 text-sm">
                    {groupName}
                  </Text>
                </Tooltip>
              )}
              {email && (
                <Tooltip label={email}>
                  <Anchor
                    href={`mailto:${email}`}
                    className="line-clamp-1 shrink-0 break-all text-sm text-primary3"
                  >
                    {email}
                  </Anchor>
                </Tooltip>
              )}
              {other}
            </>
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
