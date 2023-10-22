import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import PortaverseLogo from "../../Components/Assets/Pictures/PortaverseLogo.png";
import getUserCookie from "../../Utils/Helpers/getUserCookie";
import openInNewTab from "../../Utils/Helpers/openInNewTab";
import userAuthorization from "../../Utils/Helpers/userAuthorization";
import Products from "../ChooseProducts/Products";

function LandingPage() {
  const { isAuthorized } = userAuthorization();

  const user = getUserCookie();

  if (isAuthorized && user?.employee?.is_official_account) {
    window.location.href = `${import.meta.env.VITE_KMS_URL}/home`;
    return null;
  }
  if (isAuthorized) {
    // window.location.href = `${import.meta.env.VITE_KMS_URL}/home`;
    window.location.href = "/landing";
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src={PortaverseLogo}
        alt="company_logo"
        className="h-[100px]"
      />
      {/* <p className="font-semibold text-4xl text-text1">Welcome to</p>
      <p className="font-semibold text-5xl py-2 text-primary3">
        portaverse
      </p> */}
      <div className="flex-row justify-center m-auto w-[450px] pb-[1.5rem]">
        {window.location.href.includes("pelindo.co.id") ? (
          <p className="font-secondary text-lg text-darkGray ">
            Increase productivity through a clear understanding of
            strategic activities and ease of access to your most
            crucial knowledge.
          </p>
        ) : (
          <>
            Website ini hanya untuk keperluan testing, silakan
            kunjungi web ini{" "}
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                openInNewTab("https://staging-sso.portaverse.co.id/login")
              }
            >
              https://staging-sso.portaverse.co.id/login
            </Button>
          </>
        )}
      </div>

      {isAuthorized ? (
        <Products />
      ) : (
        <div className="my-10">
          <Link
            to="/login"
            className="px-36 rounded-md py-2 text-white font-secondary bg-primary3 hover:bg-primary4"
            type="button"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
