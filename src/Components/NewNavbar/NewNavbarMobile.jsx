/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Icon } from "@iconify/react";
import { forwardRef } from "react";
import portaverse from "../Assets/Pictures/portaverse_logo_transparent.png";
import NewNotification from "../Notification/NewNotification";
import ActionContainer from "./ActionContainer";
import NewHelpCenter from "./NewHelpCenter";
import NewNavbarSearch from "./NewNavbarSearch";
import NewProfileDropdown from "./NewProfileDropdown";

const NewNavbarMobile = forwardRef((props, ref) => {
  return (
    <nav className="flex items-center justify-between bg-white h-14 border-gray-200 pl-4 drop-shadow-sm sticky top-0 z-50">
      <a href="/landing" className="py-2.5 pr-3 cursor-pointer">
        <img
          src={portaverse}
          alt="logo"
          className="w-[2.2rem]"
          loading="lazy"
        />
      </a>
      <div className="flex items-center justify-end w-full py-2.5 mr-auto">
        {/* <NewNavbarSearch /> */}

        <div className="flex justify-center items-center gap-2">
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
