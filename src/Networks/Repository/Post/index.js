/* eslint-disable import/prefer-default-export */
import { useMutation } from "react-query";
import axiosMainClient from "../../../Configs/AxiosClient";
import baseURL from "../../../Utils/Helpers/baseURL";

const service = baseURL("/api/repository/v1");
const timeout = 99999 * 60 * 1000;

export const postFile = (withAxiosConfigs = false) => {
  const callback = (() => {
    if (withAxiosConfigs) {
      return async ({ formData, axiosConfigs, isHLS }) => {
        const res = await axiosMainClient(service, timeout).post(
          isHLS ? "/file/hls" : "/file",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            ...axiosConfigs,
          },
        );
        return res.data.data;
      };
    }
    return async (formData) => {
      const res = await axiosMainClient(service, timeout).post(
        "/file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return res.data.data;
    };
  })();
  const mutation = useMutation(callback);
  return mutation;
};
