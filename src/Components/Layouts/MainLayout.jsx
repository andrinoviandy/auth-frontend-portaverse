import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("refreshTokenSso") || localStorage.getItem("idTokenSso")) {
      const checkSession = async () => {
        const refreshToken = localStorage.getItem("refreshTokenSso");
        if (!refreshToken) return;

        const tokenUrl = `${import.meta.env.VITE_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;
        const params = new URLSearchParams();

        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);
        params.append("client_id", import.meta.env.VITE_KEYCLOAK_CLIENT_ID);

        const response = await fetch(tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });

        if (!response.ok) {
          localStorage.removeItem("accessTokenSso");
          localStorage.removeItem("idTokenSso");
          Cookies.remove("refreshToken");
          localStorage.removeItem("refreshTokenSso");
          Cookies.remove("smartkmsystemAuthClient");
          Cookies.remove("smartkmsystemAuth");
          localStorage.removeItem("session_id");
          Cookies.remove("user");

          navigate("/", { replace: true });
        }
      };
      checkSession();
    }
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="container mx-auto flex flex-col gap-2">
        {/* <nav className="p-5">
          <img
            src={PortaverseLogo}
            alt="company_logo"
            className="h-[100px] p-2"
          />
        </nav> */}

        <main className="scroll-smooth px-5 h-[calc(100vh-200px)] flex flex-col items-center justify-center pt-20">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
