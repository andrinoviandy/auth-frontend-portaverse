import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";
import { login } from "../Utils/Helpers/firebaseAuth";

export default function postLogin(
  payload,
  setIsLoading,
  setFetchError,
) {
  setIsLoading(true);
  setFetchError("");

  login(payload.email.toLowerCase().trim(), payload.password)
    .then((userCredential) => {
      const { user } = userCredential;
      const data = { isRemember: payload.isRemember, targetUID: payload.targetUID };

      axiosSSOClient
        .post("/auth/after-login", data, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
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
          // if (res.data.data.user.is_first_time_login) {
          //   window.location.href = "/referals";
          //   return;
          // }
          window.location.href = "/landing";
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
