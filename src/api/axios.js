
import axios from "axios";
import {refreshAccessToken} from "./auth.api"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const skipUrls = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh-token",
    ];

    const shouldSkip = skipUrls.some((url) =>
      originalRequest?.url?.includes(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
