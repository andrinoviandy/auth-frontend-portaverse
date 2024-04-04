import { Icon } from "@iconify/react";
import { Menu } from "@mantine/core";
import React, { useState } from "react";
import openInNewTab from "../../Utils/Helpers/openInNewTab";
import ActionContainer from "./ActionContainer";

function HelpCenter() {
  const [opened, setOpened] = useState(false);

  const content = [
    {
      title: "Frequently Asked Question",
      content: `Akses portaverse FAQ portal untuk lebih lanjut terkait
    fitur Portaverse`,
      icon: "fluent:chat-bubbles-question-16-filled",
      handleClick: () => {
        openInNewTab("https://docs.portaverse.co.id");
      },
    },
    {
      title: "Portaverse IT Management",
      content: `Menemukan masalah pada aplikasi Portaverse? Silahkan
      lapor kami`,
      icon: "jam:triangle-danger-f",
      handleClick: () => {
        openInNewTab("https://pelindo.service-now.com");
      },
    },
    {
      title: "Whatsapp",
      content: `Ada pertanyaan seputar penggunaan Portaverse?
      Silahkan kontak Porta via Whatsapp`,
      icon: "fluent:call-24-filled",
      handleClick: () => {
        openInNewTab(
          "https://api.whatsapp.com/send/?phone=%2B628113117698&text&type=phone_number&app_absent=0",
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
        <ActionContainer isActive={opened}>
          <Icon icon="mingcute:service-line" fontSize={25} />
        </ActionContainer>
      </Menu.Target>

      <Menu.Dropdown className="rounded-xl min-h-[10rem] p-4 w-[410px] shadow-md">
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
                  className="text-primary3"
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
