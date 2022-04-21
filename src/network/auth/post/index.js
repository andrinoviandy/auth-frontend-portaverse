import axios from "axios";
import Cookies from "universal-cookie";

export const postLogin = (
  email,
  password,
  login,
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
      const user = userCredential.user;
      if (user.uid) {
        cookies.set("auth", JSON.stringify(user), { path: "/" });
        var option = {
          method: "GET",
          url: `${process.env.REACT_APP_API_NEST_URL}/auth/after-login`,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
        };
        axios
          .request(option)
          .then(function (response) {
            cookies.set("kmsAuth", response.data.data.token, {
              path: "/",
            });
            setIsLoading(false);
            setPassword("");
            Navigate("/");
            if (isRemember) {
              cookies.set("email", email.toLowerCase(), {
                path: "/",
              });
            }
          })
          .catch(function (error) {
            setError(true);
            setIsLoading(false);
            setPassword("");
          });
      }
    })
    .catch((error) => {
      setError(true);
      setIsLoading(false);
      setPassword("");
    });
};
