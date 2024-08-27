import { Skeleton } from "@mantine/core";
import { lazy, Suspense } from "react";

import portaverse from "../Assets/Pictures/portaverse_logo_transparent.png";

const FederatedNavbar = lazy(() =>
  import("navbarApp/Navbar").catch(() => {
    return {
      default: () => (
        <div className="w-full bg-white shadow-navbar" />
      ),
    };
  }),
);

export default function Navbar() {
  return (
    <div className="sticky top-0 z-40 flex bg-white">
      <Suspense
        fallback={
          <Skeleton
            width="100%"
            height={56}
            className="sticky top-0"
          />
        }
      >
        <a
          href="/landing"
          className="cursor-pointer px-4 py-2.5 shadow-navbar"
        >
          <img
            src={portaverse}
            alt="logo"
            className="w-[2.2rem]"
            loading="lazy"
          />
        </a>
        <FederatedNavbar />
      </Suspense>
    </div>
  );
}
