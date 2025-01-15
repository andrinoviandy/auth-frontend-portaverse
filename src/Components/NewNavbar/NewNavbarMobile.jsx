/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Icon } from "@iconify/react";
import { forwardRef } from "react";

import ActionContainer from "./ActionContainer";
import NewHelpCenter from "./NewHelpCenter";
import NewProfileDropdown from "./NewProfileDropdown";
import portaverse from "../Assets/Pictures/portaverse_logo_transparent.png";
import NewNotification from "../Notification/NewNotification";

const NewNavbarMobile = forwardRef((props, ref) => {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-gray-200 bg-white pl-4 drop-shadow-sm">
      <a href="/landing" className="cursor-pointer py-2.5 pr-3">
        <img
          src={portaverse}
          alt="logo"
          className="w-[2.2rem]"
          loading="lazy"
        />
      </a>
      <div className="mr-auto flex w-full items-center justify-end py-2.5">
        {/* <NewNavbarMobileSearch /> */}

        <div className="flex items-center justify-center gap-2">
          <a href={`${import.meta.env.VITE_KMS_URL}/messaging`}>
            <ActionContainer>
              <Icon icon="ph:chat-circle" width={22} />
            </ActionContainer>
          </a>
          <NewHelpCenter />
          <NewNotification
            icon={<Icon icon="ri:notification-2-line" width={21} />}
          />

          <div className="ml-4">
            <NewProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
});

export default NewNavbarMobile;
