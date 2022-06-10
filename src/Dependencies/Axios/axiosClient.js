import axios from "axios";

// TODO

const axiosSSOClient = axios.create({});

// timeout
axiosSSOClient.defaults.timeout = 5000;

export default axiosSSOClient;
