import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";

export default function sendForgotPassword(
  email,
  setIsLoading,
  setFetchError,
  navigate,
) {
  setIsLoading(true);
  const data = { email };
  axiosSSOClient
    .post("/auth/reset-password", data)
    .then(() => {
      navigate();
    })
    .catch((err) => {
      setFetchError(err.response.data.message);
    })
    .finally(() => setIsLoading(false));
}
