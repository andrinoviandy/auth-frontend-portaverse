/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

export function sendForgotPassword(
  email,
  setIsError,
  navigate,
  cookies,
) {
  const option = {
    method: "POST",
    url: `${import.meta.env.VITE_API_NEST_URL}/auth/reset-password`,
    data: {
      email,
    },
  };
  axios
    .request(option)
    .then(function (res) {
      cookies.set("forgot.email", email);
      navigate("/check-email");
    })
    .catch(function (error) {
      setIsError(true);
    });
}
