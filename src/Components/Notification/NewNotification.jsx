/* eslint-disable react/prop-types */
import { Button, Menu, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import NotificationSection from "./NotificationSection";
import { setUnreadNotification } from "../../Configs/Redux/slice";
import useSocket from "../../Utils/Hooks/useSocket";
import ActionContainer from "../NewNavbar/ActionContainer";

function NewNotification({ icon }) {
  const unread = useSelector((st) => st.unreadNotifications);

  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();

  const { data, isConnected, initiate, register } = useSocket(
    import.meta.env.VITE_API_NOTIFICATIONS_SERVICE_URL,
    "/channels",
  );

  useEffect(() => {
    initiate();
  }, []);

  useEffect(() => {
    if (isConnected) {
      register("message");
    }
  }, [isConnected]);

  useEffect(() => {
    if (data?.message?.origin === "KMS") {
      dispatch(
        setUnreadNotification({
          lms: unread.kms + 1,
          all: unread.all + 1,
        }),
      );
    }
    if (data?.message?.origin === "LMS") {
      dispatch(
        setUnreadNotification({
          kms: unread.lms + 1,
          all: unread.all + 1,
        }),
      );
    }
    if (data?.message?.origin === "TMS") {
      dispatch(
        setUnreadNotification({
          tms: unread.tms + 1,
          all: unread.all + 1,
        }),
      );
    }
  }, [data]);

  const view = (v = 0, isAbsolute = true) => {
    if (v > 99) {
      return (
        <div
          className={`${
            isAbsolute
              ? "absolute h-3.5 min-w-[1.5rem]"
              : "h-5 min-w-[2rem]"
          } flex justify-center items-center   rounded-full bg-red-700 top-1 left-5`}
        >
          <h6
            className={`${
              isAbsolute ? "" : "text-md"
            } text-white font-semibold px-0.5`}
          >
            99
          </h6>
        </div>
      );
    }

    if (v === 0) {
      return null;
    }

    return (
      <div
        className={`${
          isAbsolute ? "absolute h-3.5 " : "h-5 min-w-[1.5rem]"
        } flex justify-center items-center min-w-[0.875rem] rounded-full bg-red-700 top-1 left-5`}
      >
        <h6 className="text-white font-semibold px-0.5">{v}</h6>
      </div>
    );
  };

  const notificationService = Networks(BASE_PROXY.notifications);

  const { _ } = notificationService.query(
    NOTIFICATION_ENDPOINT.GET.unreadCount,
    ["notificationGetUnreadCount"],
    {
      onSuccess: (v) => {
        dispatch(
          setUnreadNotification({
            kms: v?.kms || 0,
            tms: v?.tms || 0,
            lms: v?.lms || 0,
            all: v?.all || 0,
          }),
        );
      },
    },
  );

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      offset={17.5}
      width={500}
      radius="md"
    >
      <Menu.Target>
        <button type="button" className="relative">
          {view(unread?.all)}
          <ActionContainer isActive={opened}>{icon}</ActionContainer>
        </button>
      </Menu.Target>

      <Menu.Dropdown className=" max-h-[721px] overflow-y-scroll scroll-style-2 py-0 my-0">
        <Menu.Label className="sticky top-0 z-[2] bg-white">
          <div className="flex justify-between items-center h-10">
            <h2 className=" font-bold text-text1">Notifikasi</h2>
            {/* <Button
              onClick={() => {
                window.location.href = `${
                  import.meta.env.VITE_SSO_URL
                }/notifications/setting`;
              }}
              size="xs"
              variant="outline"
              leftIcon={<Icon icon="ic:sharp-settings" width={18} />}
            >
              Atur Notifikasi
            </Button> */}
          </div>
        </Menu.Label>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          style={() => ({
            "[data-active]": {
              color: "rgb(1, 109, 178) !important",
            },
          })}
          classNames={{
            tabLabel: "text-sm  text-center font-semibold ",
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="all">
              <div
                className={`flex gap-2 items-center ${
                  activeTab !== "all"
                    ? "text-darkGrey"
                    : "text-[#016DB2]"
                }`}
              >
                Pemberitahuan {view(unread?.all, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="kms">
              <div
                className={`flex gap-2 items-center ${
                  activeTab !== "kms"
                    ? "text-darkGrey"
                    : "text-[#016DB2]"
                }`}
              >
                KMS {view(unread?.kms, false)}
              </div>
            </Tabs.Tab>

            <Tabs.Tab value="lms">
              <div
                className={`flex gap-2 items-center ${
                  activeTab !== "lms"
                    ? "text-darkGrey"
                    : "text-[#016DB2]"
                }`}
              >
                {" "}
                LMS {view(unread?.lms, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="tms">
              <div
                className={`flex gap-2 items-center ${
                  activeTab !== "tms"
                    ? "text-darkGrey"
                    : "text-[#016DB2]"
                }`}
              >
                {" "}
                TMS {view(unread?.tms, false)}
              </div>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="all">
            <NotificationSection
              origin="all"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
          <Tabs.Panel value="kms">
            <NotificationSection
              origin="kms"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
          <Tabs.Panel value="lms">
            <NotificationSection
              origin="lms"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
          <Tabs.Panel value="tms">
            <NotificationSection
              origin="tms"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  );
}

export default NewNotification;
