import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Proxy API calls to your FastAPI backend during development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  // Build settings for S3/CloudFront
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // This ensures React Router works on CloudFront
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
