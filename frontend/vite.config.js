import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS v4 plugin
  ],
   server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080', // Use your backend port
          changeOrigin: true,
          // Optionally rewrite the path if your backend does not use /api as prefix
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
