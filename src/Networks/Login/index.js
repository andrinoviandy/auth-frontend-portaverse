/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import Cookies from "universal-cookie";
import { login } from "../../Utils/Helpers/FirebaseAuth";

export const postLogin = (
  email,
  password,
  isRemember,
  setIsLoading,
  setError,
  setPassword,
  Navigate,
) => {
  const cookies = new Cookies();
  setIsLoading(true);
  setError(false);

  login(email.toLowerCase(), password)
    .then((userCredential) => {
      const { user } = userCredential;
      if (user.uid) {
        const option = {
          method: "GET",
          url: `${
            import.meta.env.VITE_API_NEST_URL
          }/auth/after-login`,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
        };
        axios
          .request(option)
          .then(function (response) {
            cookies.set(
              "kms.session.token",
              response.data.data.token,
              {
                path: "/",
                expires: new Date(
                  new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
                ),
                // for deplopment uncomment this line =>
                // domain: `.${window.location.hostname}`,
                // secure: true,
              },
            );
            setIsLoading(false);
            setPassword("");
            Navigate("/redirect");
            if (isRemember) {
              cookies.set("email", email.toLowerCase(), {
                path: "/",
              });
            }
          })
          .catch(function () {
            setError(true);
            setIsLoading(false);
            setPassword("");
          });
      }
    })
    .catch(() => {
      setError(true);
      setIsLoading(false);
      setPassword("");
    });
};
