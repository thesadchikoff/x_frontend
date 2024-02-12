/* eslint-disable no-param-reassign */
import axios from "axios";

import { LOCAL_STORAGE_KEY } from "../constants";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    LOCAL_STORAGE_KEY.TOKEN
  )}`;
  return config;
});
