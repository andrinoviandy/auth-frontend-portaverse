import { useQuery } from "react-query";
import axios from "axios";
import baseURLExternal from "../../../Utils/Helpers/baseURLExternalUser";
import bearerAuth from "../../../Utils/Helpers/bearerAuth";

type Variables = {
  enabled?: boolean;
};

export const useGetExternalUserMenu = ({
  enabled = true,
}: Variables) => {
  return useQuery(
    ["getExternalUserMenu"],
    async () => {
      try {
        const res = await axios.get(
          `${baseURLExternal}/api/auth/get-menu`,
          {
            headers: {
              Accept: "*/*",
              Authorization: bearerAuth,
            },
          },
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching external user Menu:", error);
        throw error;
      }
    },
    {
      enabled,
      keepPreviousData: true,
    },
  );
};
