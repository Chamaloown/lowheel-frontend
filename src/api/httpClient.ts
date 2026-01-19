import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://lowheel.duckdns.org/api",
  // baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
