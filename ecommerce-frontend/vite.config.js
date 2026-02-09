import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // is the request starts with /api the server will be target to this default url
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
      '/images': {
        target: 'http://localhost:3000'
      }
    }
  }
})
