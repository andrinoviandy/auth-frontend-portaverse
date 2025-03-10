import { useQuery } from "react-query";
import axios from "axios";
import baseURLExternal from "../../../Utils/Helpers/baseURLExternalUser";

type Variables = {
  invitationCode: number | string | undefined;
};

export const useGetExternalUser = ({ invitationCode }: Variables) => {
  return useQuery(
    ["getExternalUser", invitationCode],
    async () => {
      if (!invitationCode) {
        throw new Error("Invitation code is required");
      }

      try {
        const res = await axios.get(
          `${baseURLExternal}/api/auth/get-invitation/${invitationCode}`,
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtTktnQkpvTVlmVTVsQXVoVjl6bWV1WFpXSW0yIiwidXNlcl9pZCI6MTI1LCJlbXBsb3llZSI6eyJlbXBsb3llZV9pZCI6NSwiZW1wbG95ZWVfbnVtYmVyIjoidXNlcmQifSwicm9sZV9jb2RlIjpbIlNNRSIsIlVTRVIiLCJTQSIsbnVsbF0sInByaXZpbGVnZXMiOlsicGxlYXNlIGdldCBpdCBvbiBncm91cCBzZXJ2aWNlIChlYWNoIG1vZHVsZSkiXSwicmFuZG9tIjoiUHJldmVudGl2ZSBtZWFzdXJlcyIsImV4cCI6MTc0MjAyMjU5NCwiaWF0IjoxNzQxNTkwNTk0fQ.0Hu5dHXQY6h_3iBmoM5got0yg9Pb2lB2ru2CbTVs-kQ`,
            },
          },
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching external user:", error);
        throw error;
      }
    },
    {
      keepPreviousData: true,
    },
  );
};
