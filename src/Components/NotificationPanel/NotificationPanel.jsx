import { Icon } from "@iconify/react";
import { Button, Loader } from "@mantine/core";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import useInfiniteFetchObserver from "../../Utils/Hooks/useInfiniteFetchObserver";
import KPI from "../Assets/Icon/KPI";

const MODULE_ICONS = {
  Assessment: (
    <Icon icon="fluent:clipboard-task-20-filled" width={20} />
  ),
  KPI: (
    <KPI
      backgroundColor="white"
      color="rgb(1 109 178)"
      width={20}
      height={20}
    />
  ),
};

function Item({ moduleName, message, date, lastElement, viewed }) {
  return (
    <div
      className="flex justify-between gap-2 items-center border bg-white rounded-md p-3"
      ref={lastElement}
    >
      {!viewed && (
        <span className="text-primary3 text-lg">&bull;</span>
      )}
      <div className="text-white bg-primary3 rounded-full p-2.5 w-10 h-10">
        {MODULE_ICONS[moduleName]}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold">{moduleName}</p>
        <p className="text-sm">{message}</p>
        <p className="text-sm text-darkGrey">
          {dayjs(date).format("MMMM D, YYYY at hh:mm A")}
        </p>
      </div>
      <Button size="sm">Lihat Detail</Button>
    </div>
  );
}

export default function NotificationPanel({
  classNames = { root: "" },
}) {
  const queryClient = useQueryClient();
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
    },
    {
      params: {
        page: 1,
        size: 10,
        origin: "TMS",
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

  return (
    <div
      className={`flex flex-col gap-5 bg-primary3 rounded-md p-4 ${classNames.root}`}
    >
      <div className="flex justify-between items-center text-white">
        <h3 className="font-bold">Pemberitahuan</h3>
        <div className="flex gap-2">
          <Button
            // variant="white"
            size="sm"
            leftIcon={<Icon icon="ci:check-all-big" fontSize={24} />}
            onClick={markAsReadHandler}
            // disabled={disabled}
            // loading={loading}
            className="p-0 h-fit bg-primary3"
          >
            Mark as read
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-h-[300px] pr-3 overflow-y-auto scroll-style-4">
        {(() => {
          if (status === "loading")
            return <Loader size="sm" className="mx-auto my-3.5" />;

          if (!notifications) return null;

          return notifications.pages.map((v, i) =>
            v.notifications.map((notification, j) => {
              console.log(notification);
              if (
                notifications.pages.length === i + 1 &&
                v.notifications.length === j + 1
              )
                return (
                  <Item
                    moduleName={notification.module}
                    message={`${notification.send_from_name || ""} ${
                      notification.template
                    }`}
                    date={dayjs(
                      notification.reminder_at,
                    ).toISOString()}
                    lastElement={lastElement}
                    viewed={notification.viewed}
                  />
                );

              return (
                <Item
                  moduleName={notification.module}
                  message={`${notification.send_from_name} ${notification.template}`}
                  date={dayjs(notification.reminder_at).toISOString()}
                  viewed={notification.viewed}
                />
              );
            }),
          );
        })()}

        {status !== "loading" && isFetchingNextPage ? (
          <Loader size="sm" className="mx-auto my-3.5" />
        ) : null}
      </div>
    </div>
  );
}

NotificationPanel.propTypes = {
  classNames: PropTypes.shape({
    root: PropTypes.string,
  }),
};

NotificationPanel.defaultProps = {
  classNames: {
    root: "",
  },
};
