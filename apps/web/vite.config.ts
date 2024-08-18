import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Ensure Vite listens on all interfaces
    port: 8080,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
