import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Add an interceptor to include the token from localStorage in the request headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add an interceptor to handle response errors and redirect to login if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the response status is 401 (Unauthorized), redirect to the login page
      window.location.href = "/Login"; // Replace with the URL of your login page
    }
    return Promise.reject(error);
  }
);

export default api;
