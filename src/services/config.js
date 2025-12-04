import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = "Bearer " + token;;
    }
    
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
