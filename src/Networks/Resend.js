import axiosSSOClient from "../Configs/AxiosClient/ssoAxiosClient";

export default function Resend(email, setIsLoading, setFetchError) {
  setIsLoading(true);
  const data = { email };
  axiosSSOClient
    .post("/auth/reset-password", data)
    .then(() => {
      setFetchError("");
    })
    .catch((err) => {
      setFetchError(err.response.data.message);
    })
    .finally(() => setIsLoading(false));
}
