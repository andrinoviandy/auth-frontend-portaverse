import Cookies from "universal-cookie";
import axiosSSOClient from "../Configs/AxiosClient";
import { login } from "../Utils/Helpers/FirebaseAuth";

export default function postLogin(
  email,
  password,
  isRemember,
  setIsLoading,
  setFetchError,
) {
  const cookies = new Cookies();
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
          .then((response) => {
            cookies.set("user", response.data.data.user_data, {
              path: "/",
              expires: new Date(
                response.data.data.user_data.expire_token * 1000,
              ),
            });
            window.location.href = "/products";
            if (isRemember) {
              cookies.set("email", email.toLowerCase(), {
                path: "/",
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
