import axios from "axios";

const AxiosDBInstance = axios.create({
  baseURL: "http://localhost:44300/api/"
});

export default AxiosDBInstance;
