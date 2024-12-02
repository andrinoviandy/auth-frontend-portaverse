import { Menu } from "@mantine/core";
import clsx from "clsx"
import React from "react";
import openInNewTab from "../../Utils/Helpers/openInNewTab";
import ActionContainer from "./ActionContainer";

function PlatformMenu() {
  const content = [
    {
      title: "KMS",
      content: `Media bersosialisasi antar sesama portizen`,
      disabled: false,
      handleClick: () => {
        openInNewTab(import.meta.env.VITE_KMS_URL);
      },
    },
    {
      title: "LMS",
      content: `Eksplorasi materi pembelajaran sesuai minat dan bakat`,
      disabled: true,
      handleClick: () => {},
    },
    {
      title: "TMS",
      content: `Ketahui target capaian perusahaan dan temukan pengembangan diri`,
      disabled: false,
      handleClick: () => {
        openInNewTab(import.meta.env.VITE_TMS_URL);
      },
    },
  ];

  return (
    <Menu position="bottom-end" offset={17.5} width={400} radius="md">
      <Menu.Target>
        <ActionContainer>
          <span className="text-sm font-semibold">LMS</span>
        </ActionContainer>
      </Menu.Target>

      <Menu.Dropdown className="rounded-xl min-h-[10rem] p-4 w-[410px] shadow-md">
        {content.map((e) => (
          <Menu.Label
            key={e.title}
            className={clsx(
              "sticky top-0 z-[2] rounded-md",
              !e.disabled ? "bg-white cursor-pointer" : "bg-bg2",
            )}
            onClick={e.handleClick}
          >
            <div className="flex justify-start gap-4 items-center mb-3">
              <div className="flex items-center justify-center bg-primary3 w-10 h-10 p-2 rounded-md">
                <span className="text-white">{e.title}</span>
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

export default PlatformMenu;
