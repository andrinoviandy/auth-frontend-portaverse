import { Menu, Tabs } from "@mantine/core";
import React, { useState } from "react";
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from "../../Networks/endpoint";
import { Networks } from "../../Networks/factory";
import ActionContainer from "../NewNavbar/ActionContainer";
import NotificationSection from "./NotificationSection";

function NewNotification({ icon }) {
  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState("lms");

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

  const { data: unreadNotificationCount } = notificationService.query(
    NOTIFICATION_ENDPOINT.GET.unreadCount,
    ["notificationGetUnreadCount"],
    {
      refetchInterval: 1000 * 30,
    },
  );

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
          {view(unreadNotificationCount?.all)}
          <ActionContainer isActive={opened}>{icon}</ActionContainer>
        </button>
      </Menu.Target>

      <Menu.Dropdown className="min-h-[10rem] max-h-[35rem] overflow-y-scroll scroll-style-2 py-0 my-0">
        <Menu.Label className="sticky top-0 z-[2] bg-white">
          <div className="flex justify-between items-center h-10">
            <h2 className=" font-bold text-primary3">Notifikasi</h2>
            {/* <div className="flex gap-1">
              <button type="button" className="relative">
                {view(0)}
                <ActionContainer>
                  <Icon
                    icon="mdi:information-slab-box-outline"
                    width={24}
                    color={color.primary3}
                  />
                </ActionContainer>
              </button>{" "}
              <button type="button" className="relative">
                <ActionContainer>
                  <Icon icon="ic:sharp-settings" width={22} />
                </ActionContainer>
              </button>
            </div> */}
          </div>
        </Menu.Label>
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          classNames={{
            tabLabel: "text-lg  text-center font-semibold",
          }}
          sx={() => ({
            "[data-active]": {
              color: "rgb(1, 109, 178) !important",
            },
          })}
        >
          <Tabs.List grow>
            <Tabs.Tab value="kms">
              <div className="flex gap-2 items-center">
                KMS {view(unreadNotificationCount?.kms, false)}
              </div>
            </Tabs.Tab>

            <Tabs.Tab value="lms">
              <div className="flex gap-2 items-center">
                LMS {view(unreadNotificationCount?.lms, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="tms">
              <div className="flex gap-2 items-center">
                TMS {view(unreadNotificationCount?.tms, false)}
              </div>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="kms">
            <NotificationSection
              origin="kms"
              tab={activeTab}
              unreadCount={unreadNotificationCount}
            />
          </Tabs.Panel>
          <Tabs.Panel value="lms">
            <NotificationSection
              origin="lms"
              tab={activeTab}
              unreadCount={unreadNotificationCount}
            />
          </Tabs.Panel>
          <Tabs.Panel value="tms">
            <NotificationSection
              origin="tms"
              tab={activeTab}
              unreadCount={unreadNotificationCount}
            />
          </Tabs.Panel>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  );
}

export default NewNotification;
