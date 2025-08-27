import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import Error404Svg from "../Assets/Icon/404";
import PortaverseLogo from "../Assets/Pictures/PortaverseLogo.png";
import { Networks } from "../../Networks/factory";
import { AUTH_ENDPOINT, BASE_PROXY } from "../../Networks/endpoint";

export default function Error404() {
  const navigate = useNavigate();
  const auth = Networks(BASE_PROXY.auth);
  const { mutate: logout } = auth.mutation("post", {
    onSuccess: () => {
      navigate("/login");
    },
  });
  const backToLogin = () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(
          /=.*/,
          `=;expires=${new Date(0).toUTCString()};path=/`,
        );
    });
    localStorage.removeItem("otp_verified");
    localStorage.removeItem("isEmailOtpRequired");
    localStorage.removeItem("otp_countdown");
    logout({ endpoint: AUTH_ENDPOINT.POST.logout });
  };

  return (
    <div className="flex flex-col bg-white py-12 px-20 min-h-screen">
      <Link to="/" className="cursor-pointer">
        <img
          src={PortaverseLogo}
          alt="company_logo"
          className="h-[100px] p-2"
        />
      </Link>
      <div className="flex flex-col gap-8 m-auto w-[] items-center">
        <Error404Svg />
        <div className="flex flex-col text-center">
          <h2 className="font-semibold">
            The page you’re looking for is missing
          </h2>
          <p className="text-darkGrey">
            Sorry we could not find your page.
          </p>
        </div>
        <Button
          className="font-medium bg-primary w-[150px]"
          onClick={() => {
            if (
              localStorage.getItem("otp_blocked") === "true" ||
              localStorage.getItem("isEmailOtpRequired") === "1"
            ) {
              backToLogin();
            } else {
              navigate(-1);
            }
          }}
        >
          Go Back
        </Button>
      </div>
      <footer className="text-center">
        <p className="text-darkGrey">
          Powered by KMPlus Consulting 2023
        </p>
      </footer>
    </div>
  );
}
