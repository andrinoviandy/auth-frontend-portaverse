import axios from "axios";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
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
        const option = {
          method: "POST",
          url: `${
            import.meta.env.VITE_API_NEST_URL
          }/auth/after-login`,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          data: {
            isRemember,
          },
        };
        axios
          .request(option)
          .then((response) => {
            cookies.set(
              "kms.session.token",
              response.data.data.token,
              {
                path: "/",
                expires: new Date(
                  jwtDecode(response.data.data.token).exp * 1000,
                ),
                // for deplopment uncomment this line =>
                // domain: `.${window.location.hostname}`,
                // secure: true,
              },
            );
            setIsLoading(false);

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
