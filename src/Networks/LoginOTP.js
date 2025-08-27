import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";
import { login } from "../Utils/Helpers/firebaseAuth";

export default function otpLogin(
  payload,
  setIsLoading,
  setUidUser,
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
      localStorage.removeItem("otp_blocked");

      const uid = user?.reloadUserInfo?.localId;
      if (uid) {
        setUidUser(uid);
        if (onSuccess) {
          onSuccess(uid);
        }
      }
      setIsLoading(false);
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
