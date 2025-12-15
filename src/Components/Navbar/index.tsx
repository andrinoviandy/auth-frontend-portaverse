// import { Skeleton } from "@mantine/core";
// import { Suspense } from "react";

import portaverse from "../Assets/Pictures/portaverse_logo_transparent.png";
import Exit from "../Assets/Icon/Exit";
import { Networks } from "../../Networks/factory";
import {
  AUTH_ENDPOINT,
  BASE_PROXY
} from "../../Networks/endpoint";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// const FederatedNavbar = lazy(() =>
//   import("navbarApp/Navbar").catch(() => {
//     return {
//       default: () => (
//         <div className="w-full bg-white shadow-navbar" />
//       ),
//     };
//   }),
// );

export default function Navbar() {
  const navigate = useNavigate();
  const auth = Networks(BASE_PROXY.auth);
  const { mutate: logout } = auth.mutation("post", {
    onSuccess: () => {
      navigate("/");
    },
  });

  const logoutSso = async () => {
    const refreshToken = localStorage.getItem("refreshTokenSso")
    const idToken = localStorage.getItem("idTokenSso")
    if (idToken) {
      const tokenUrl = `${import.meta.env.VITE_KEYCLOAK_ISSUER}/realms/pelindo/protocol/openid-connect/logout`;
      const params = new URLSearchParams();

      params.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID);
      params.append("client_secret", "");
      // if (CLIENT_SECRET) params.append("client_secret", CLIENT_SECRET);
      if (refreshToken) params.append("refresh_token", refreshToken);
      if (idToken) params.append("id_token_hint", idToken);

      await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      localStorage.removeItem("accessTokenSso")
      localStorage.removeItem("idTokenSso")
      Cookies.remove("refreshToken")
      localStorage.removeItem("refreshTokenSso")
      Cookies.remove("smartkmsystemAuthClient")
      localStorage.removeItem("session_id")
    }
  }

  const handleLogout = async () => {
    if (localStorage.getItem("refreshTokenSso") || localStorage.getItem("idTokenSso")) {
      logoutSso()
    }
    Cookies.remove("refreshToken", {
      path: "/",
      domain: ".ilcs.co.id"
    });
    Cookies.remove("smartkmsystemAuth", {
      path: "/",
      domain: ".ilcs.co.id"
    });
    Cookies.remove("smartkmsystemAuthClient", {
      path: "/",
      domain: ".ilcs.co.id"
    });
    Cookies.remove("user", {
      path: "/",
      domain: ".ilcs.co.id"
    });

    navigate("/")


    localStorage.removeItem("otp_verified");
  }

  return (
    <div className="sticky top-0 z-40 flex bg-white justify-between">

      <div className="">
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
      </div>
      <div className="">
        <button
          type="button"
          className="rounded-b-xl hover:bg-bg2"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-2 text-red-800 text-nowrap">
            <Exit />
            <p className="font-medium">Sign out</p>
          </div>
        </button>
      </div>
    </div>
  );
}
