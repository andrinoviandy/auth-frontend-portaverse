import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";
import { login } from "../Utils/Helpers/firebaseAuth";

export default function postLogin(
  payload,
  setIsLoading,
  setFetchError,
  onSuccess,
) {
  setIsLoading(true);
  setFetchError("");

  login(payload.email.toLowerCase().trim(), payload.password)
    .then((userCredential) => {
      const { user } = userCredential;
      const data = {
        isRemember: payload.isRemember,
        targetUID: payload.targetUID,
      };
      const userInfoUid = user.reloadUserInfo.localId;

      axiosSSOClient
        .post("/auth/after-login", data, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          localStorage.removeItem("otp_blocked");

          if (res.data.data.user.role_code.includes("SBCN")) {
            window.location = `${
              import.meta.env.VITE_LMS_URL
            }/subcon-management/${
              res.data.data.user?.subcon?.subcon_id
            }`;
            return;
          }
          if (res.data.data.user.role_code.includes("VNDR")) {
            window.location = `${
              import.meta.env.VITE_LMS_URL
            }/vendor-management/${
              res.data.data.user?.vendor?.vendor_id
            }`;
            return;
          }
          if (res.data.data.user.role_code.includes("CADH")) {
            window.location = `${
              import.meta.env.VITE_CMS_URL
            }/change-catalyst-team-monitoring-system`;
            return;
          }
          if (res.data.data.user.role_code.includes("CADC")) {
            window.location = `${
              import.meta.env.VITE_CMS_URL
            }/change-catalyst-team-monitoring-system`;
            return;
          }
          if (onSuccess) onSuccess(userInfoUid);
        })
        .catch((err) => {
          if (err.name === "FirebaseError") {
            setFetchError("Email or Password is incorrect");
          } else {
            setFetchError("Something went wrong");
          }
          setIsLoading(false);
        });
    })
    .catch((err) => {
      if (err.name === "FirebaseError") {
        setFetchError("Email or Password is incorrect");
      } else {
        setFetchError("Something went wrong");
      }
      setIsLoading(false);
    });
}
