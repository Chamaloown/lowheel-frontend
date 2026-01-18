import axios from "axios";

console.log(import.meta.env.VITE_API_URL)
export const httpClient = axios.create({
  baseURL: "https://lowheel.duckdns.org/api",
  // baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
