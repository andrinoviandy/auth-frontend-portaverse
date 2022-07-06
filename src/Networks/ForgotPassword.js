import axiosSSOClient from "../Configs/AxiosClient";

export function sendForgotPassword(
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

export function resendForgotPassword(email) {
  const data = { email };
  axiosSSOClient.post("/auth/reset-password", data);
}
