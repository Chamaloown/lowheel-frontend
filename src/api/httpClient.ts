import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://lowheel.duckdns.org/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
