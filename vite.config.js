import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/quote': {
        target: 'https://zenquotes.io/api/today',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/quote/, '')
      }
    }
  }
})
