import Cookies from "universal-cookie";
import axiosSSOClient from "../Configs/AxiosClient";

export default function sendForgotPassword(
  email,
  setIsLoading,
  setFetchError,
) {
  setIsLoading(true);
  const cookies = new Cookies();
  const data = { email };
  axiosSSOClient
    .post("/auth/reset-password", data)
    .then(() => {
      cookies.set("forgot.email", email, {
        expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
      });
      window.location.href = "/check-email";
    })
    .catch((err) => {
      setFetchError(err.response.data.message);
    })
    .finally(() => setIsLoading(false));
}
