
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dotenv from 'dotenv';

// dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", 
  },
  server: {
    watch: {
      usePolling: true, // 파일 변경 감지 강화
    },
  },
});