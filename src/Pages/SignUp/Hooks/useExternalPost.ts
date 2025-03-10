import { useMutation } from "react-query";
import axios from "axios";
import baseURLExternal from "../../../Utils/Helpers/baseURLExternalUser";

export interface ExternalData {
  invitationId: string;
  name: string;
  email: string;
  birthday: string;
  fileId: string;
  address: string;
  password: string;
  roleCode: "USER";
}

export const useExternalPost = () => {
  return useMutation(
    (postData: ExternalData) =>
      axios
        .post(`${baseURLExternal}/auth/sign-up`, postData, {
          headers: {
            accept: "*/*",
            // Authorization: bearerAuth,
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
