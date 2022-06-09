import axios from "axios";

const axiosSSOClient = axios.create({});

// timeout
axiosSSOClient.defaults.timeout = 5000;

export default axiosSSOClient;
