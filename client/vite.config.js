import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// Retrieve host information from environment variables or use default values
const API_USERS_HOST = process.env.API_USERS_HOST || "http://localhost:8086";
const API_ORDERS_HOST = process.env.API_ORDERS_HOST || "http://localhost:8085";
const API_PAYMENTS_HOST =
  process.env.API_PAYMENTS_HOST || "http://localhost:5211";
const API_ITEMS_HOST = process.env.API_ITEMS_HOST || "http://localhost:5267";

export default defineConfig({
  server: {
    proxy: {
      // Proxy /api/user requests to specified host
      "/api/users": {
        target: API_USERS_HOST,
        secure: false,
        changeOrigin: true,
      },
      // Proxy /api/orders requests to specified host
      "/api/orders": {
        target: API_ORDERS_HOST,
        secure: false,
        changeOrigin: true,
      },
      // Proxy /api/payments requests to specified host
      "/api/Payments": {
        target: API_PAYMENTS_HOST,
        secure: false,
        changeOrigin: true,
      },
      // Proxy /api/items requests to specified host
      "/api/Items": {
        target: API_ITEMS_HOST,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
