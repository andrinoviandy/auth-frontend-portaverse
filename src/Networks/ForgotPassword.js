import axios from "axios";
import Cookies from "universal-cookie";

// TODO refactor this

export default function sendForgotPassword(
  email,
  setIsLoading,
  setFetchError,
) {
  setIsLoading(true);
  const cookies = new Cookies();
  const option = {
    method: "POST",
    url: `${import.meta.env.VITE_API_NEST_URL}/auth/reset-password`,
    data: {
      email,
    },
  };
  axios
    .request(option)
    .then(() => {
      cookies.set("forgot.email", email, {
        expires: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
      });
      window.location.href = "/check-email";
    })
    .catch((err) => {
      setFetchError(err.response.data.message);
    })
    .finally(() => setIsLoading(false));
}
