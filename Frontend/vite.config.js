import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/uploads": "http://localhost:5000", // Proxy /uploads to the backend
      "/api": "http://localhost:5000",
    },
  },
});
