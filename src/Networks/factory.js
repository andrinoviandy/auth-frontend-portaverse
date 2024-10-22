/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-unused-vars
import { useInfiniteQuery, useMutation, useQuery } from "react-query";

import axiosMainClient from "../Configs/AxiosClient";
import baseURL from "../Utils/Helpers/baseURL";
import showErrorDialog from "../Utils/Helpers/showErrorDialog";

/**
 * @param {string} service
 */
export function Networks(service) {
  const s = baseURL(service);
  return {
    /**
     * @param {string} endpoint Endpoint to be queried
     * @param {array} dependencies Array of dependency variables. Triggers the query everytime the dependencies change.
     * @param {import("react-query").UseQueryOptions} options
     * @param {import("axios").AxiosRequestConfig} axiosConfigs
     */
    query(
      endpoint,
      dependencies,
      options = {},
      axiosConfigs = {},
      method = "get",
      axiosConfigsPostMethod = {},
    ) {
      const queries = useQuery(
        dependencies,
        async () => {
          const res = await axiosMainClient(s)[method](
            endpoint,
            method === "get"
              ? {
                  ...axiosConfigs,
                }
              : axiosConfigs,
            {
              ...axiosConfigsPostMethod,
            },
          );
          return res.data.data;
        },
        {
          onError: (err) => showErrorDialog(err),
          ...options,
        },
      );

      return queries;
    },

    /**
     * @param {string} endpoint
     * @param {array} dependencies
     * @param {import("react-query").UseQueryOptions} options
     * @param {import("axios").AxiosRequestConfig} axiosConfigs
     */
    infiniteQuery(
      endpoint,
      dependencies,
      options = {},
      axiosConfigs = {},
    ) {
      const infiniteQuery = useInfiniteQuery(
        dependencies,
        async ({ pageParam = 1 }) => {
          const res = await axiosMainClient(s).get(endpoint, {
            ...axiosConfigs,
            params: { ...axiosConfigs.params, page: pageParam },
          });

          return res.data.data;
        },
        {
          getNextPageParam: (lastPage, allPages) => {
            const maxPages =
              lastPage.count / axiosConfigs.params.size;
            const nextPage = allPages.length + 1;
            return nextPage <= Math.ceil(maxPages)
              ? nextPage
              : undefined;
          },
          onError: (err) => showErrorDialog(err),
          ...options,
        },
      );
      return infiniteQuery;
    },

    /**
     * @param {("post"|"put"|"delete")} method
     * @param {import("react-query").UseQueryOptions} options
     * @param {import("axios").AxiosRequestConfig} outerAxiosConfigs
     */
    mutation(method, options = {}, outerAxiosConfigs = {}) {
      const mutation = useMutation(
        async ({ endpoint, data, axiosConfigs = {} }) => {
          const res = await axiosMainClient(s).request({
            method,
            url: endpoint,
            data,
            ...outerAxiosConfigs,
            ...axiosConfigs,
          });
          return res;
        },
        {
          onError: (err) => showErrorDialog(err),
          ...options,
        },
      );

      return mutation;
    },
  };
}
