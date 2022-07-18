import axios from "axios";

const customConfig = {};
if (import.meta.env.DEV) {
  customConfig.baseURL = "/api"; // for development use proxy
} else {
  customConfig.baseURL = import.meta.env.VITE_API_AUTH_SERVICE_URL; // for production use direct url
}

const axiosSSOClient = axios.create(customConfig);

axiosSSOClient.interceptors.request.use(
  (config) => {
    /* eslint-disable no-param-reassign */
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

export default axiosSSOClient;
