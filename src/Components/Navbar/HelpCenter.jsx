import React, { useState } from "react";
import { Menu } from "@mantine/core";
import { Icon } from "@iconify/react";
import openInNewTab from "../../../Utils/Helpers/openInNewTab";

function HelpCenter() {
  const [opened, setOpened] = useState(false);

  const content = [
    {
      title: "Frequently Asked Question",
      content: `Akses portaverse FAQ portal untuk lebih lanjut terkait
    fitur Portaverse`,
      icon: "fluent:chat-bubbles-question-16-filled",
      handleClick: () => {
        openInNewTab(
          "https://portaverse.atlassian.net/servicedesk/customer/portal/3",
        );
      },
    },
    {
      title: "Portaverse IT Management",
      content: `Menemukan masalah pada aplikasi Portaverse? Silahkan
      lapor kami`,
      icon: "jam:triangle-danger-f",
      handleClick: () => {
        openInNewTab(
          "https://portaverse.atlassian.net/servicedesk/customer/portal/3/group/-1",
        );
      },
    },
    {
      title: "Whatsapp",
      content: `Ada pertanyaan seputar penggunaan Portaverse?
      Silahkan kontak Porta via Whatsapp`,
      icon: "fluent:call-24-filled",
      handleClick: () => {
        openInNewTab(
          "https://api.whatsapp.com/send/?phone=%2B6281911111375&text&type=phone_number&app_absent=0",
        );
      },
    },
  ];

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
        <button className="text-darkGray" type="button">
          <Icon icon="bx:support" color="#016db2" fontSize={20} />
        </button>
      </Menu.Target>

      <Menu.Dropdown className="min-h-[10rem] max-h-[35rem] overflow-y-scroll scroll-style-2 p-4 w-[410px]">
        {content.map((e) => (
          <Menu.Label
            key={e.title}
            className="sticky top-0 z-[2] bg-white cursor-pointer"
            onClick={e.handleClick}
          >
            <div className="flex justify-start gap-4 items-center mb-3">
              <div className=" bg-bg2 p-2 rounded">
                <Icon
                  icon={e.icon}
                  className="text-primary1"
                  width={32}
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold text-text1">
                  {e.title}
                </p>
                <p className="text-[12px] font-normal text-text1">
                  {e.content}
                </p>
              </div>
            </div>
          </Menu.Label>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default HelpCenter;
