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
      const data = { isRemember: payload.isRemember };

      axiosSSOClient
        .post("/auth/after-login", data, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then(() => {
          window.location.href = `${
            import.meta.env.VITE_KMS_URL
          }/home`;
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
