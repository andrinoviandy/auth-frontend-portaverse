import { useMutation } from "react-query";
import axios from "axios";
import baseURLExternal from "../../../Utils/Helpers/baseURLExternalUser";

export interface ExternalData {
  invitationId: number;
  name: string;
  email: string;
  birthday: string;
  fileId: number;
  address: string;
  password: string;
  roleCode: string;
  startDate: string,
  endDate: string,
}

export const useExternalPost = () => {
  return useMutation(
    (postData: ExternalData) =>
      axios
        .post(`${baseURLExternal}/api/auth/sign-up`, postData, {
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
