import axios from "axios";

const targetUrl = "https://ntoptech.free.beeceptor.com/api/1.0.0/";

const api = axios.create({
  baseURL: targetUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
