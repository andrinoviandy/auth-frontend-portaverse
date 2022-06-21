import axios from "axios";

const axiosSSOClient = axios.create({
  baseURL: "/api",
});

axiosSSOClient.interceptors.request.use(
  (config) => {
    /* eslint-disable no-param-reassign */
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// timeout
axiosSSOClient.defaults.timeout = 5000;

// redirect when cookies expired
axiosSSOClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    console.error(
      "Looks like there was a problem. Status Code: ",
      error.response.status,
    );
    return Promise.reject(error);
  },
);

// timeout
axiosSSOClient.defaults.timeout = 5000;

export default axiosSSOClient;
