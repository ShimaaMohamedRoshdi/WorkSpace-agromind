import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7057", // Backend server URL
});

// Add request interceptor to include authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Adding auth token to request:", config.url);
    } else {
      console.warn("No auth token found for request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
