import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";
import Cookies from 'js-cookie';

export default async function postLoginSsoV2(payload, setIsLoading, setMessage) {
  try {
    setMessage("Generate Token")
    console.log("ngehit after-login-sso");

    const res = await axiosSSOClient.post("/auth/after-login-sso", payload);

    const { idToken, targetUID } = res.data.data;

    if (res?.data?.success === true) {
      localStorage.setItem("accessTokenSso", payload?.access_token)
      localStorage.setItem("refreshTokenSso", payload?.refresh_token)
      localStorage.setItem("idTokenSso", payload?.id_token)
      localStorage.setItem("session_id", payload?.refresh_token)
      if (payload.isRemember) {
        localStorage.setItem("access_token", payload?.access_token);
      } else {
        sessionStorage.setItem("access_token", payload?.access_token);
      }

      const data = {
        isRemember: false,
        targetUID: targetUID
      };

      // 🔹 Hit backend login langsung
      setMessage("Redirect ke Dashboard Portaverse")
      axiosSSOClient
        .post("/auth/after-login", data, {
          headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((res) => {
          setMessage("Berhasil Login Portaverse")
          if (res.data.data.user.role_code.includes("SBCN")) {
            window.location = `${import.meta.env.VITE_LMS_URL
              }/subcon-management/${res.data.data.user?.subcon?.subcon_id
              }`;
            return;
          }
          if (res.data.data.user.role_code.includes("VNDR")) {
            window.location = `${import.meta.env.VITE_LMS_URL
              }/vendor-management/${res.data.data.user?.vendor?.vendor_id
              }`;
            return;
          }
          if (res.data.data.user.role_code.includes("CADH")) {
            window.location = `${import.meta.env.VITE_CMS_URL
              }/change-catalyst-team-monitoring-system`;
            return;
          }
          if (res.data.data.user.role_code.includes("CADC")) {
            window.location = `${import.meta.env.VITE_CMS_URL
              }/change-catalyst-team-monitoring-system`;
            return;
          }
          window.location.href = "/landing";
        })
    }

  } catch (err) {
    console.error("Login error:", err);
    setMessage("User Tidak Ada Akses");
  } finally {
    setIsLoading(false);
  }
}
