import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy /api/user requests to localhost:3002
      "/api/users": {
        target: "http://localhost:8086",
        secure: false,
        changeOrigin: true,
      },
      // Proxy /api/product requests to localhost:3001
      "/api/orders": {
        target: "http://localhost:8085",
        secure: false,
        changeOrigin: true,
      },
      "/api/Payments": {
        target: "https://localhost:7101",
        secure: false,
        changeOrigin: true,
      },
      "/api/Items": {
        target: "https://localhost:7120",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
