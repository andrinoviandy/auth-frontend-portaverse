import { Icon } from "@iconify/react";
import { Loader, clsx } from "@mantine/core";
import dayjs from "dayjs";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import { color } from "../../Utils/Constants";
import notifURLLookup from "../../Utils/Helpers/notifURLLookup";
import KPI from "../Assets/Icon/KPI";
import NoItems from "../Errors/NoItems";

const MODULE_ICONS = {
  Assessment: (
    <Icon icon="fluent:clipboard-task-20-filled" width={20} />
  ),
  KPI: (
    <KPI
      backgroundColor={color.bg2}
      color={color.primary3}
      width={50}
      height={50}
    />
  ),
};

function Item({ moduleName, message, date, viewed, onClick }) {
  return (
    <button
      type="button"
      className="flex gap-4 items-start text-start bg-bg4 rounded-md py-3 px-5"
      onClick={onClick}
    >
      <div className="shrink-0">{MODULE_ICONS[moduleName]}</div>

      <div className="flex flex-col gap-1 grow-0">
        <p className="font-bold">{moduleName}</p>
        <p className="text-sm">{parse(message)}</p>
        <p className="text-sm text-darkGrey">
          {dayjs(date).format("MMMM D, YYYY hh:mm A")}
        </p>
      </div>
    </button>
  );
}

export default function NewNotificationPanel({
  classNames = { root: "" },
}) {
  const queryClient = useQueryClient();
  const notificationService = Networks(BASE_PROXY.notifications);

  const { data: notifications, isLoading } =
    notificationService.query(
      NOTIFICATION_ENDPOINT.GET.notifications,
      ["notifications-hero-section"],
      {
        select: (res) => res?.notifications,
      },
      {
        params: {
          page: 1,
          size: 3,
        },
      },
    );

  const { mutate: put } = notificationService.mutation("put", {
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications-hero-section"]);
    },
  });

  const handleClickNotif = (notification) => {
    if (!notification?.viewed) {
      put(
        {
          endpoint: NOTIFICATION_ENDPOINT.PUT.markAsRead(
            notification?.notification_id,
          ),
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([`notifications${origin}`]);
          },
        },
      );
    }
    notifURLLookup(
      notification?.notification_topic_code,
      notification?.send_from,
      notification?.data,
    );
  };

  const markAsReadHandler = () => {
    const notificationPromises = notifications
      .filter((e) => !e.viewed)
      .map((e) => {
        return put({
          endpoint: NOTIFICATION_ENDPOINT.PUT.markAsRead(
            e.notification_id,
          ),
        });
      });

    Promise.all(notificationPromises);
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-5 rounded-md border",
        classNames.root,
      )}
    >
      {/* TODO: Uncomment status banner if Backend is ready */}
      {/* <StatusBanner
        variant="error"
        message="Mohon Maaf dikarenakan adanya gangguan pengisian KPI. Mohon tunggu beberapa saat."
      /> */}
      <div className="flex justify-between items-center border-b px-5 py-5">
        <h3 className="font-bold">Pemberitahuan</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={markAsReadHandler}
            className="flex items-center gap-2 text-lg text-primary3 font-semibold"
          >
            <Icon icon="ci:check-all-big" fontSize={24} />
            Tandai Sudah Dibaca
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-h-[590px] px-5 overflow-y-auto scroll-style-4">
        {(() => {
          if (isLoading)
            return <Loader size="sm" className="mx-auto my-3.5" />;

          if (!isLoading && !!notifications?.length)
            return notifications?.map((item) => (
              <Item
                moduleName={item.module}
                message={item?.message}
                date={dayjs(item.reminder_at).toISOString()}
                viewed={item?.viewed}
                onClick={() => handleClickNotif(item)}
              />
            ));

          return (
            <NoItems
              label="Anda belum memiliki pemberitahuan"
              classNames={{ wrapper: "scale-[0.85]" }}
            />
          );
        })()}
      </div>
      {/* <a
        href="/landing"
        className="text-primary3 hover:text-primary4 hover:underline font-semibold mb-5 mx-auto"
      >
        Lihat Semua Pemberitahuan
      </a> */}
    </div>
  );
}

NewNotificationPanel.propTypes = {
  classNames: PropTypes.shape({
    root: PropTypes.string,
  }),
};

NewNotificationPanel.defaultProps = {
  classNames: {
    root: "",
  },
};
