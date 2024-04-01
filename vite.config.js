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
        "/api/smartplan/v1": {
          target: process.env.VITE_API_SMARTPLAN_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/smartplan\/v1/, ""),
        },
        "/api/course/v1": {
          target: process.env.VITE_API_COURSE_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/course\/v1/, ""),
        },
        "/api/signature/v1": {
          target: process.env.VITE_API_SIGNATURE_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api\/signature\/v1/, ""),
        },
        "/api/search-engine/v1": {
          target: process.env.VITE_API_SEARCH_ENGINE_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/search-engine\/v1/, ""),
        },
        "/api/daily-quiz/v1": {
          target: process.env.VITE_API_DAILY_QUIZ_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/daily-quiz\/v1/, ""),
        },
        "/api/assessment/v1": {
          target: process.env.VITE_API_ASSESSMENT_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/assessment\/v1/, ""),
        },
        "/api/development-plan/v1": {
          target: process.env.VITE_API_DEVELOPMENT_PLAN_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/development-plan\/v1/, ""),
        },
        "/api/cms/v1": {
          target: process.env.VITE_API_CMS_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/cms\/v1/, ""),
        },
      },
    },
  });
};
