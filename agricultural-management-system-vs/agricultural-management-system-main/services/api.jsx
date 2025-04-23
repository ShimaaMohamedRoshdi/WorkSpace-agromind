import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5132", // Changed from https://localhost:7057 to http://localhost:5132
});

export default api;
