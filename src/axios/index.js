import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "https://rwyam0a1r9.execute-api.ap-southeast-2.amazonaws.com/dev/",
  // baseURL: process.env.REACT_APP_PRODUCT_BASE_URL,
});

export default axiosClient;