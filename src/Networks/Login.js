import NiceModal from "@ebay/nice-modal-react";
import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";
import { login } from "../Utils/Helpers/firebaseAuth";
import MODAL_IDS from "../Components/Modals/modalIds";

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
      const data = {
        isRemember: payload.isRemember,
        targetUID: payload.targetUID,
      };

      axiosSSOClient
        .post("/auth/after-login", data, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          if (!res.data.success) {
            setFetchError(res.data.message || "Something went wrong");
            setIsLoading(false);
            return;
          }

          const roleCode = res.data.data.user.role_code;

          if (roleCode.includes("SBCN")) {
            window.location = `${import.meta.env.VITE_LMS_URL}/subcon-management/${res.data.data.user?.subcon?.subcon_id}`;
            return;
          }

          if (roleCode.includes("VNDR")) {
            window.location = `${import.meta.env.VITE_LMS_URL}/vendor-management/${res.data.data.user?.vendor?.vendor_id}`;
            return;
          }

          if (
            roleCode.includes("CADH") ||
            roleCode.includes("CADC")
          ) {
            window.location = `${import.meta.env.VITE_CMS_URL}/change-catalyst-team-monitoring-system`;
            return;
          }

          // if (res.data.data.user.is_first_time_login) {
          //   window.location.href = "/referals";
          //   return;
          // }
          window.location.href = "/landing";
        })
        .catch((err) => {
          const errMessage = err?.response?.data?.message;

          if (err.name === "FirebaseError") {
            setFetchError("Email or Password is incorrect");
          } else if (errMessage) {
            NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
              message: "Error Login",
              subMessage: errMessage,
              variant: "danger",
              labelCancel: "Close",
              withCancel: true,
              withConfirm: false,
            });
            // setFetchError(errMessage);
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
