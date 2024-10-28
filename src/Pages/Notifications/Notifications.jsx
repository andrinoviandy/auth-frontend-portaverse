import { Tabs } from "@mantine/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../../Components/Navbar";
import NotificationSection from "../../Components/Notification/NotificationSection";

function Notifications() {
  const [activeTab, setActiveTab] = useState("all");
  const unread = useSelector((st) => st.unreadNotifications);

  const view = (v = 0, isAbsolute = true) => {
    if (v > 99) {
      return (
        <div
          className={`${
            isAbsolute ? "absolute h-3.5 min-w-6" : "h-5 min-w-8"
          } left-5 top-1 flex   items-center justify-center rounded-full bg-red-700`}
        >
          <h6
            className={`${
              isAbsolute ? "" : "text-md"
            } px-0.5 font-semibold text-white`}
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
          isAbsolute ? "absolute h-3.5 " : "h-5 min-w-6"
        } left-5 top-1 flex min-w-3.5 items-center justify-center rounded-full bg-red-700`}
      >
        <h6 className="px-0.5 font-semibold text-white">{v}</h6>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {/* // TODO: Replace NewNavbar with Navbar if development is on ILCS env (GitLab) */}
      <Navbar />
      {/* <NewNavbar /> */}
      <div className="px-24 py-8">
        <div className="flex items-center justify-between">
          <h1 className="pb-4 font-semibold">Notifikasi</h1>
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
        </div>{" "}
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          style={() => ({
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
                className={`flex items-center gap-2 ${
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
                className={`flex items-center gap-2 ${
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
                className={`flex items-center gap-2 ${
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
                className={`flex items-center gap-2 ${
                  activeTab !== "tms"
                    ? "text-darkGrey"
                    : "text-primary3"
                }`}
              >
                {" "}
                TMS {view(unread?.tms, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="cms">
              <div
                className={`flex items-center gap-2 ${
                  activeTab !== "cms"
                    ? "text-darkGrey"
                    : "text-primary3"
                }`}
              >
                {" "}
                CMS {view(unread?.cms, false)}
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
          <Tabs.Panel value="cms">
            <NotificationSection
              origin="cms"
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
