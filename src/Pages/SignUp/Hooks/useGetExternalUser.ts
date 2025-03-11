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
