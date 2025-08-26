import { useMutation } from "react-query";
import axios from "axios";
import baseURLExternal from "../../../Utils/Helpers/baseURLExternalUser";

export const useVerifyOTPPost = () => {
  return useMutation(
    (postData) =>
      axios
        .post(`${baseURLExternal}/api/email-otp/verify`, postData, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data),
    {
      onError: (error) => {
        console.error("Post Template Error:", error);
      },
    },
  );
};
