import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensure Vite listens on all interfaces
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Use 'localhost' as it will be correctly routed by the internal networking
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});