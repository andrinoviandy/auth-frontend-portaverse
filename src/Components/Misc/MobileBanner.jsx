import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { isAndroid, isIOS, isMobile } from "react-device-detect";
import portaverse from "../Assets/Pictures/portaverse_logo_transparent.png";
import wave from "../Assets/Svg/wave-home3.svg";

export default function MobileBanner() {
  const [open, setOpen] = useState(true);
  const appStoreUrl = (() => {
    if (isAndroid)
      return "https://play.google.com/store/apps/details?id=com.kmplusapp";
    if (isIOS)
      return "https://apps.apple.com/id/app/portaverse-pelindo/id6444711716";
    return "";
  })();

  const openApp = () => {
    window.location.replace("portaverse://home");
    // setTimeout(() => {
    //   window.location.replace(appStoreUrl);
    // }, 700);
  };

  useEffect(() => {
    if (isMobile) {
      openApp();
    }
  }, []);

  // if (open && isMobile) {
  //   return (
  //     <div className="relative flex items-center justify-between gap-5 bg-[#F5FDFF] px-5 py-2 w-full">
  //       <img
  //         className="absolute z-[1] bottom-0 w-full left-[-1.25rem]"
  //         alt="wave"
  //         src={wave}
  //       />

  //       <div className="flex items-center gap-2 z-[2]">
  //         <button type="button" onClick={() => setOpen(false)}>
  //           <Icon icon="ph:x-bold" />
  //         </button>

  //         <img
  //           src={portaverse}
  //           alt="logo"
  //           className="w-[2.2rem] object-contain"
  //           loading="lazy"
  //         />
  //         <p className="font-semibold text-sm">
  //           Mari menggunakan aplikasi Portaverse!
  //         </p>
  //       </div>

  //       <Button onClick={openApp} className="z-[2]">
  //         Buka App
  //       </Button>
  //     </div>
  //   );
  // }
  return null;
}
