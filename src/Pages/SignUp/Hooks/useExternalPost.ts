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
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtTktnQkpvTVlmVTVsQXVoVjl6bWV1WFpXSW0yIiwidXNlcl9pZCI6MTI1LCJlbXBsb3llZSI6eyJlbXBsb3llZV9pZCI6NSwiZW1wbG95ZWVfbnVtYmVyIjoidXNlcmQifSwicm9sZV9jb2RlIjpbIlNNRSIsIlVTRVIiLCJTQSIsbnVsbF0sInByaXZpbGVnZXMiOlsicGxlYXNlIGdldCBpdCBvbiBncm91cCBzZXJ2aWNlIChlYWNoIG1vZHVsZSkiXSwicmFuZG9tIjoiUHJldmVudGl2ZSBtZWFzdXJlcyIsImV4cCI6MTc0MjAyMjU5NCwiaWF0IjoxNzQxNTkwNTk0fQ.0Hu5dHXQY6h_3iBmoM5got0yg9Pb2lB2ru2CbTVs-kQ`,
            // "Content-Type": "application/json",
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
