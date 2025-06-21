import axios from "axios";

// Use the working backend URL
const api = axios.create({
  baseURL: "https://localhost:7057", // Updated to the working URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log(`🚀 Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log(`✅ Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  error => {
    console.error('❌ Response Error:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;