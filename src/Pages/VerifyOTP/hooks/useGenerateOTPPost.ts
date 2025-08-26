import { useMutation } from "react-query";
import axios from "axios";
import baseURLExternal from "../../../Utils/Helpers/baseURLExternalUser";

export interface UserData {
  isEmailOtpRequired: number;
  link: string;
  uuid: string;
  expiredAt: string;
  createdAt: string;
}

export const useGenerateOTPPost = () => {
  return useMutation(
    (postData: UserData) =>
      axios
        .post(`${baseURLExternal}/api/email-otp/generate`, postData, {
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
