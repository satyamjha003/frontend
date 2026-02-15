import axios from "axios";

const api = axios.create({
  baseURL: "https://blogger-v4p3.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
