import { Icon } from "@iconify/react";
import { Button, Loader, Menu } from "@mantine/core";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import notifUrlLookup from "../../Utils/Helpers/notifUrlLookup";
import useInfiniteFetchObserver from "../../Utils/Hooks/useInfiniteFetchObserver";

export default function Notification({ icon }) {
  const [opened, setOpened] = useState(false);

  const view = (v) => {
    if (v > 99) {
      return (
        <div className="absolute flex justify-center items-center min-w-[0.875rem] h-3.5 rounded-full bg-red-700 -top-1.5 left-2">
          <h6 className="text-white font-semibold px-0.5">99+</h6>
        </div>
      );
    }

    if (v === 0) {
      return null;
    }

    return (
      <div className="absolute flex justify-center items-center min-w-[0.875rem] h-3.5 rounded-full bg-red-700 -top-1.5 left-2">
        <h6 className="text-white font-semibold px-0.5">{v}</h6>
      </div>
    );
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const urlLookup = (type, id, data) => {
    const lookupObj = notifUrlLookup(data, id);

    return navigate(lookupObj[type]);
  };

  const notificationService = Networks(BASE_PROXY.notifications);

  const { data: unreadNotificationCount } = notificationService.query(
    NOTIFICATION_ENDPOINT.GET.unreadCount,
    ["notificationGetUnreadCount"],
    {
      refetchInterval: 1000 * 60,
    },
  );

  const {
    data: notifications,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = notificationService.infiniteQuery(
    NOTIFICATION_ENDPOINT.GET.notifications,
    ["notifications"],
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.totalPage;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
      enabled: opened,
    },
    {
      params: {
        page: 1,
        size: 10,
      },
    },
  );

  const lastElement = useInfiniteFetchObserver(
    status,
    hasNextPage,
    fetchNextPage,
  );

  const { isLoading: isLoadingMarkAsRead, mutate: markAsRead } =
    notificationService.mutation("put", {
      onSuccess: () => {
        queryClient.invalidateQueries(["notificationGetUnreadCount"]);
        queryClient.invalidateQueries(["notifications"]);
      },
    });

  const markAsReadHandler = () => {
    const notificationPromises = notifications.pages.map((n) =>
      n.notifications
        .filter((e) => !e.viewed)
        .map((e) => {
          return markAsRead({
            endpoint: NOTIFICATION_ENDPOINT.PUT.markAsRead(
              e.notification_id,
            ),
          });
        }),
    );

    Promise.all(notificationPromises);
  };

  const menuItem = (notification, lastRefEl) => {
    return (
      <Menu.Item
        ref={lastRefEl}
        key={notification.notification_id}
        onClick={() => {
          if (!notification.viewed) {
            markAsRead({
              endpoint: NOTIFICATION_ENDPOINT.PUT.markAsRead(
                notification.notification_id,
              ),
            });
          }
          urlLookup(
            notification.notification_topic_code,
            notification.send_from,
            notification?.data,
          );
        }}
      >
        <div
          className={`flex flex-col gap-[3px] py-[10px] px-[18px] text-left cursor-pointer rounded-md ${
            +notification.viewed ? "" : "bg-[#C9F3FB]"
          }`}
        >
          <h4 className="text-primary4 font-medium relative">
            <span
              className={`absolute h-2 rounded-full -left-3 top-2 ${
                +notification.viewed ? "" : "bg-primary3"
              }`}
            />
            {notification.origin}
            <Icon
              icon="fluent:arrow-circle-up-12-filled"
              className="text-primary3 absolute text-[40px] -right-4 -top-1"
            />
          </h4>
          <p className="text-text1 text-base font-medium">
            <span className="text-primary3">
              {notification.send_from_name}
            </span>
            &nbsp;
            {notification.template.toLowerCase()}
            &nbsp;
            <span className="text-primary3">
              {notification.entities}
            </span>
          </p>
          <p className="text-darkGrey text-xs font-normal">
            {dayjs(notification.reminder_at)
              .format("MMMM D, YYYY ; HH:mm a")
              .replace(";", "at")}
          </p>
        </div>
      </Menu.Item>
    );
  };

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      offset={17.5}
      width={400}
      radius="md"
    >
      <Menu.Target>
        <button type="button" className="relative">
          {view(unreadNotificationCount)}
          {icon}
        </button>
      </Menu.Target>

      <Menu.Dropdown className="min-h-[10rem] max-h-[35rem] overflow-y-scroll scroll-style-2 py-0 my-0">
        <Menu.Label className="sticky top-0 z-[2] bg-white">
          <div className="flex justify-between items-center h-10">
            <p className="text-sm font-semibold text-text1">
              Notifications
            </p>
            <div className="flex gap-2">
              <Button
                variant="white"
                size="sm"
                leftIcon={
                  <Icon icon="ci:check-all-big" fontSize={24} />
                }
                onClick={markAsReadHandler}
                disabled={!unreadNotificationCount}
                loading={isLoadingMarkAsRead}
                className="p-0 h-fit bg-white"
              >
                Mark as read
              </Button>
            </div>
          </div>
        </Menu.Label>

        {(() => {
          if (status === "loading")
            return <Loader size="sm" className="mx-auto my-3.5" />;

          if (!notifications) return null;

          return notifications.pages.map((v, i) =>
            v.notifications.map((notification, j) => {
              if (
                notifications.pages.length === i + 1 &&
                v.notifications.length === j + 1
              )
                return menuItem(notification, lastElement);

              return menuItem(notification, null);
            }),
          );
        })()}

        {status !== "loading" && isFetchingNextPage ? (
          <Loader size="sm" className="mx-auto my-3.5" />
        ) : null}
      </Menu.Dropdown>
    </Menu>
  );
}

Notification.propTypes = {
  icon: PropTypes.element.isRequired,
};
