import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://chatterly-hp0h.onrender.com",
        // target: "http://localhost:3000",
        secure: false,
      },
    },
  },
})
