import axios from "axios";

export default function axiosMainClient(
  serviceBaseURL,
  timeout = 300000,
) {
  const axiosClient = axios.create({
    baseURL: serviceBaseURL,
    timeout,
  });

  // add header before sending request
  axiosClient.interceptors.request.use(
    (config) => {
      /* eslint-disable no-param-reassign */
      config.withCredentials = true;

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  // redirect when cookies expired
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        window.location.href = "/login";
      }
      // eslint-disable-next-line no-console
      console.error(
        "Looks like there was a problem. Status Code: ",
        error?.response?.status,
      );
      return Promise.reject(error);
    },
  );

  return axiosClient;
}
