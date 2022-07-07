import axiosSSOClient from "../Configs/AxiosClient";
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
      if (user.uid) {
        const data = { isRemember: payload.isRemember };
        axiosSSOClient.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
        axiosSSOClient
          .post("/auth/after-login", data)
          .then(() => {
            window.location.replace("/products");
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
