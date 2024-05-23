import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      //add http://localhost:8080 before all the requests those are start with /api
      "/api1": {
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
