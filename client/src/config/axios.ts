import axios from "axios";
import { baseURL } from "./apiRoutes";

const _axios = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Object.freeze(_axios);
