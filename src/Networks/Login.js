import axiosSSOClient from "../Configs/AxiosClient";
import { login } from "../Utils/Helpers/FirebaseAuth";

export default function postLogin(
  email,
  password,
  isRemember,
  setIsLoading,
  setFetchError,
) {
  setIsLoading(true);
  setFetchError("");

  login(email.toLowerCase(), password)
    .then((userCredential) => {
      const { user } = userCredential;
      if (user.uid) {
        const data = { isRemember };
        axiosSSOClient.defaults.headers.common.Authorization = `Bearer ${user.accessToken}`;
        axiosSSOClient
          .post("/auth/after-login", data)
          .then(() => {
            window.location.href = "/products";
          })
          .catch((err) => {
            if (err.name === "FirebaseError") {
              setFetchError("Email/Password is incorrect");
            } else {
              setFetchError("Something went wrong");
            }
            setIsLoading(false);
          });
      }
    })
    .catch((err) => {
      if (err.name === "FirebaseError") {
        setFetchError("Email/Password is incorrect");
      } else {
        setFetchError("Something went wrong");
      }
      setIsLoading(false);
    });
}
