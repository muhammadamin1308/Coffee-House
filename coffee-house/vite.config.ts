import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  publicDir: 'public',
  preview: {
    host: '0.0.0.0',
    strictPort: false,
    allowedHosts: ['.onrender.com']
  }
})
