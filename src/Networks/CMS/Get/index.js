/* eslint-disable import/prefer-default-export */
import { useQuery } from "react-query";
import axiosMainClient from "../../../Configs/AxiosClient";
import baseURL from "../../../Utils/Helpers/baseURL";

const service = baseURL("/api/cms/v1");

export const getLMSHome = (
  handleSuccess = () => {},
  handleError = () => {},
  enabled = true,
) => {
  const queries = useQuery(
    ["getLMSHome"],
    async () => {
      const res = await axiosMainClient(service).get(`/lms/home`);
      return res.data.data;
    },
    {
      enabled,
      onSuccess: (res) => handleSuccess(res),
      onError: (err) => handleError(err),
    },
  );
  return queries;
};
