import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api/sso/v1": {
          target: process.env.VITE_API_AUTH_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/sso\/v1/, ""),
        },
        "/api/employees/v1": {
          target: process.env.VITE_API_EMPLOYEES_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/employees\/v1/, ""),
        },
        "/api/social/v1": {
          target: process.env.VITE_API_SOCIAL_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api\/social\/v1/, ""),
        },
        "/api/notifications/v1": {
          target: process.env.VITE_API_NOTIFICATIONS_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) =>
            path.replace(/^\/api\/notifications\/v1/, ""),
        },
      },
    },
  });
};
