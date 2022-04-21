import axios from "axios";
import handleLogout from "../../../utils/helpers/logout";
import useJwtAuth from "../../../utils/hooks/useJwtAuth";

// for nest server
const axiosNestClient = axios.create({
  baseURL: process.env.REACT_APP_API_NEST_URL,
});

// add header before sending request
axiosNestClient.interceptors.request.use(
  (config) => {
    const auth = useJwtAuth();
    const fbAuth = auth.fbAuth;
    const kmsAuth = auth.kmsAuth;

    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["authorization"] = "Bearer " + fbAuth;
    config.headers["kms-authorization"] = "Bearer " + kmsAuth;
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

// timeout
axiosNestClient.defaults.timeout = 5000;

// redirect when cookies expired
axiosNestClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      handleLogout();
    }
    console.log(
      "Looks like there was a problem. Status Code: ",
      error.response.status,
    );
    return Promise.reject(error);
  },
);

export { axiosNestClient };
