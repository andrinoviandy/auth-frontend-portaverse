import React, { useState } from "react";
import { Button, Tabs } from "@mantine/core";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import NewNavbar from "../../Components/NewNavbar/NewNavbar";

import NotificationSection from "../../Components/Notification/NotificationSection";

function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const unread = useSelector((st) => st.unreadNotifications);

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

  return (
    <div className="flex flex-col">
      <NewNavbar />
      <div className="px-[6rem] py-8">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold pb-4">Notifikasi</h1>
          <Button
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
          </Button>
        </div>{" "}
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          sx={() => ({
            "[data-active]": {
              color: "rgb(1, 109, 178) !important",
            },
          })}
          classNames={{
            tabLabel: "text-sm  text-center font-semibold",
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="all">
              <div
                className={`flex gap-2 items-center ${
                  activeTab !== "all"
                    ? "text-darkGrey"
                    : "text-primary3"
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
                    : "text-primary3"
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
                    : "text-primary3"
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
                    : "text-primary3"
                }`}
              >
                {" "}
                TMS {view(unread?.tms, false)}
              </div>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="all">
            <NotificationSection
              isPage
              origin="all"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
          <Tabs.Panel value="kms">
            <NotificationSection
              isPage
              origin="kms"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
          <Tabs.Panel value="lms">
            <NotificationSection
              isPage
              origin="lms"
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
          <Tabs.Panel value="tms">
            <NotificationSection
              origin="tms"
              isPage
              tab={activeTab}
              unreadCount={unread}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default Notifications;
